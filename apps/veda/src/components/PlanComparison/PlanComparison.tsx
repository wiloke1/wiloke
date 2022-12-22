import React, { FC } from 'react';
import { FontAwesome, View } from 'wiloke-react-core';
import * as styles from './styles';

interface Data {
  name: string;
  handle: string;
  price: number;
  trialDays: number;
  numberOfSections: number;
  numberOfPages: number;
  yearlyPrice: number;
}

export interface PlanComparisonProps {
  data: Data[];
}

const PlanComparison: FC<PlanComparisonProps> = ({ data }) => {
  const renderPlan = ({ name, numberOfPages, numberOfSections, price, trialDays, handle, yearlyPrice }: Data) => {
    return (
      <View css={styles.plan} key={handle}>
        <View css={styles.planHeader}>
          <View tagName="h3" css={styles.planTitle}>
            {name}
          </View>
          <View css={styles.planPrice}>
            {price === 0 ? (
              'Free'
            ) : (
              <>
                ${price}
                <View tagName="span">/mo</View>
              </>
            )}
          </View>
          {yearlyPrice === 0 ? (
            <View css={styles.planPrice} />
          ) : (
            <>
              Or{' '}
              <View css={styles.planPrice}>
                ${yearlyPrice}
                <View tagName="span">/yr</View>
              </View>
            </>
          )}
        </View>
        <View css={styles.planBody}>
          <View tagName="ul">
            <View tagName="li">
              <FontAwesome type="far" name="check" />
            </View>
            <View tagName="li">{numberOfSections}</View>
            <View tagName="li">{trialDays}</View>
          </View>
          <View tagName="h3"></View>
          <View tagName="ul">
            <View tagName="li">1</View>
            <View tagName="li">
              <FontAwesome type="far" name="check" />
            </View>
          </View>
          <View tagName="h3"></View>
          <View tagName="ul">
            <View tagName="li">{numberOfPages}</View>
            <View tagName="li" css={styles.last}>
              <FontAwesome type="far" name="check" />
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View css={styles.container}>
      <View css={styles.features}>
        <View css={styles.featuresHeader}>
          <View tagName="h3" css={styles.featuresTitle}>
            Features
          </View>
        </View>
        <View css={styles.featuresContent}>
          <View tagName="ul">
            <View tagName="li">Visual Editor</View>
            <View tagName="li">Sections</View>
            <View tagName="li">Trial days</View>
          </View>
          <View tagName="h3">Theme builder</View>
          <View tagName="ul">
            <View tagName="li">10 Page Types</View>
            <View tagName="li">6 Templates</View>
          </View>
          <View tagName="h3">Page builder</View>
          <View tagName="ul">
            <View tagName="li">Pages</View>
            <View tagName="li" css={styles.last}>
              5 Page Types
            </View>
          </View>
        </View>
      </View>
      <View css={styles.plans}>{data.map(renderPlan)}</View>
    </View>
  );
};

export default PlanComparison;
