import { useCallback, useEffect, useRef, useState } from 'react';
import {
  unstable_cancelCallback as cancelCallback,
  unstable_scheduleCallback as scheduleCallback,
  unstable_runWithPriority as runWithPriority,
  unstable_IdlePriority as IdlePriority,
  unstable_ImmediatePriority as ImmediatePriority,
  CallbackNode,
} from 'scheduler';

/**
 * Cleanup function (like in the useEffect hook)
 */
export type CleanupFunction = () => void;

/**
 * Generator that can yield or return cleanup function
 */
export type TransitionEffectGenerator = Generator<
  CleanupFunction | void,
  CleanupFunction | void,
  // eslint-disable-next-line
  any
>;

/**
 * Function that returns effect generator (function*() {})
 */
export type TransitionEffectCallback = () => TransitionEffectGenerator;

// use interface for IDE to pick-up js docs
export interface StartTransitionEffect {
  /**
   * State updates and effects inside the callback generator function are allowed to be deferred.
   * It will return control to the main-thread on each yield.
   * The generator can yield and return cleanup function that will run when transition stops
   * (on stopTransitionEffect() call or on hook unmount).
   *
   * @param callback Generator function to run.
   * @param [priorityLevel] Optional priority level from the scheduler package.
   */
  (callback: TransitionEffectCallback, priorityLevel?: number): void;
}

// use interface for IDE to pick-up js docs
export interface StopTransitionEffect {
  /**
   * Stops running transition effect. Does nothing if effect is not running.
   */
  (): void;
}

/**
 * Allows components to run long effects without blocking the main thread. It does this by splitting
 * long tasks into smaller chunks of work using generator function.
 *
 * The `useTransitionEffect` hook has similar API to the `useTransition` hook. It returns three values in an array.
 *
 * The first is a boolean, a way of informing us whether we’re waiting for the transition effect to finish.
 * The second is a function that takes a generator function. We can use it to run and split (with yield) long effect.
 * The third is a function that stop the running effect.
 */
export function useTransitionEffect(): [boolean, StartTransitionEffect, StopTransitionEffect] {
  // store pending state
  const [isPending, setPending] = useState(false);
  // store task and cleanup ref (so we can access them in a separate stopGenerator function)
  const taskRef = useRef<CallbackNode>();
  const cleanupRef = useRef<CleanupFunction | void>();

  const stopTransitionEffect = useCallback<StopTransitionEffect>(() => {
    if (taskRef.current) {
      // cancel current task
      cancelCallback(taskRef.current);
      taskRef.current = undefined;
      setPending(false);
    }
    if (typeof cleanupRef.current === 'function') {
      // run cleanup effect
      cleanupRef.current();
    }
    cleanupRef.current = undefined;
  }, []);

  const startTransitionEffect = useCallback<StartTransitionEffect>((callback: TransitionEffectCallback, priorityLevel = IdlePriority): void => {
    // stop ongoing transition effect (just in case)
    stopTransitionEffect();

    // call generator function to get generator
    const generator = callback();

    // define callback to schedule
    const iterate = () => {
      const result = generator.next();
      // store yielded/returned value as a cleanup function
      cleanupRef.current = result.value;

      if (result.done) {
        setPending(false);
      } else {
        // we're not done - return itself
        // scheduler package will automatically schedule it as a "continuation callback"
        return iterate;
      }
    };
    // start synchronously
    const nextCallback = runWithPriority(priorityLevel, () => iterate());

    // we have next callback - schedule it
    if (nextCallback) {
      // set pending to true with the highest priority (to run before nextCallback)
      runWithPriority(ImmediatePriority, () => setPending(true));
      // schedule next iterations using scheduler
      taskRef.current = scheduleCallback(priorityLevel, nextCallback);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // stop transition effect on unmount
    return stopTransitionEffect;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [isPending, startTransitionEffect, stopTransitionEffect];
}
export {
  unstable_shouldYield as shouldYield,
  unstable_runWithPriority as runWithPriority,
  unstable_IdlePriority as IdlePriority,
  unstable_LowPriority as LowPriority,
  unstable_NormalPriority as NormalPriority,
  unstable_UserBlockingPriority as UserBlockingPriority,
  unstable_ImmediatePriority as ImmidatePriority,
} from 'scheduler';
