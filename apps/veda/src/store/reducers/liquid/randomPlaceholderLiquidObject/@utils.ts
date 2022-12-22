export const randomNumber = () => Math.ceil(Math.random() * 1000);

export const randomImage = () => {
  const images = [
    'https://cdn.shopify.com/s/files/1/0552/5510/5616/files/1-rvxbapdthd.jpg?v=1669713781',
    'https://cdn.shopify.com/s/files/1/0552/5510/5616/files/2-niybpncsmr.jpg?v=1669713781',
    'https://cdn.shopify.com/s/files/1/0552/5510/5616/files/3-cykfexrwga.jpg?v=1669713781',
    'https://cdn.shopify.com/s/files/1/0552/5510/5616/files/4-qpzjiczdmx.jpg?v=1669713781',
    'https://cdn.shopify.com/s/files/1/0552/5510/5616/files/5-avjdkayarc.jpg?v=1669713781',
    'https://cdn.shopify.com/s/files/1/0552/5510/5616/files/6-swrommqsle.jpg?v=1669713781',
  ];
  const random = Math.floor(Math.random() * images.length);
  return images[random];
};
