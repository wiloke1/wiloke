export const statusRequestAdapter = (prevStatus: Status): Status => (prevStatus === 'success' ? 'success' : 'loading');
