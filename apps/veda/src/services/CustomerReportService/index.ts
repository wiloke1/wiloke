import fetchAPI from 'utils/functions/fetchAPI';
import { retry } from 'utils/retry';
import { Record } from './@types/Record';
import { cURL } from './consts';

export const create = async (record: Record) => {
  try {
    const handleRequest = () => {
      return fetchAPI.request({
        url: `${cURL}/reporters`,
        method: 'post',
        data: record,
      });
    };
    await retry(handleRequest, { delayLength: 30000, maxAttempts: 2 });
  } finally {
    return;
  }
};

export const reportCampaignInvitation = async ({ customerEmail, shopName }: { customerEmail: string; shopName: string }) => {
  try {
    const handleRequest = () => {
      return fetchAPI.request({
        url: `${cURL}/report-campaign-invitation`,
        method: 'post',
        data: {
          customerEmail,
          shopName,
        },
      });
    };
    await retry(handleRequest, { delayLength: 30000, maxAttempts: 2 });
  } finally {
    return;
  }
};

export const customerReportService = {
  create,
  reportCampaignInvitation,
};
