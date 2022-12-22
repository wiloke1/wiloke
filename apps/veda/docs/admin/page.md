#### Dashboard

[https://shopify-builder.netlify.app/page](https://shopify-builder.netlify.app/page)



```ts
/** Mô tả data trên server trả về để hiển thị theme */
interface RecommendCard {
  rating?: number;
  title: string;
  description: string;
  image?: string;
  reviews?: number;
}

interface ServerResponse {
  data: ThemeServiceData[];
  message: string;
  status: string;
}
```

![alt](https://www.dropbox.com/home/Photos/image?preview=Capture.PNG)
