import { Search } from 'utils/LiquidSyntaxToTwig';

export const GET_SEARCH_RESULT_PLACEHOLDER = (): Search => {
  return {
    default_sort_by: 'relevance',
    filters: [],
    performed: true,
    results: [
      {
        id: '6643365576925',
        object_type: 'product',
        gift_card: true,
        title: 'Antique Drawers',
        vendor: 'Company 123',
        handle: 'antique-drawers',
        available: true,
        compare_at_price: 300,
        compare_at_price_max: 300,
        compare_at_price_min: 300,
        compare_at_price_varies: false,
        content: '<p>Antique wooden chest of drawers</p>',
        description: '<p>Antique wooden chest of drawers</p>',
        featured_image: {
          created_at: 'Fri Mar 18 08:46:46 UTC 2022',
          updated_at: 'Fri Mar 18 08:46:46 UTC 2022',
          aspect_ratio: 1.4991896,
          id: '28304276848861',
          media_type: 'image',
          preview_image: 'https://cdn.shopify.com/s/files/1/0616/9480/4174/products/20046729-1-offwhite.jpg?v=1652169256',
          src: 'https://cdn.shopify.com/s/files/1/0616/9480/4174/products/20046729-1-offwhite.jpg?v=1652169256',
          width: 925,
          height: 617,
          url: 'https://cdn.shopify.com/s/files/1/0616/9480/4174/products/20046729-1-offwhite.jpg?v=1652169256',
          alt: 'Antique Drawers (6643365576925)',
          attached_to_variant: false,
        },
        images: [
          {
            created_at: 'Fri Mar 18 08:46:46 UTC 2022',
            updated_at: 'Fri Mar 18 08:46:46 UTC 2022',
            aspect_ratio: 1.4991896,
            id: '28304276848861',
            media_type: 'image',
            preview_image:
              'https://cdn.shopify.com/s/files/1/0550/4260/5277/products/babys-room_925x_b19e8b03-3223-43f8-8ea9-c6b2c8b00ba0.jpg?v=1633515775',
            src: 'https://cdn.shopify.com/s/files/1/0550/4260/5277/products/babys-room_925x_b19e8b03-3223-43f8-8ea9-c6b2c8b00ba0.jpg?v=1633515775',
            width: 925,
            height: 617,
            url: 'https://cdn.shopify.com/s/files/1/0550/4260/5277/products/babys-room_925x_b19e8b03-3223-43f8-8ea9-c6b2c8b00ba0.jpg?v=1633515775',
            alt: 'Antique Drawers (6643365576925)',
            attached_to_variant: false,
          },
        ],
        media: [
          {
            alt: 'Antique Drawers (6643365576925)',
            id: '20557979648221',
            position: 'IMAGE',
            preview_image: {
              created_at: 'Fri Mar 18 08:46:46 UTC 2022',
              updated_at: 'Fri Mar 18 08:46:46 UTC 2022',
              aspect_ratio: 1.4991896,
              id: '20557979648221',
              media_type: 'image',
              preview_image:
                'https://cdn.shopify.com/s/files/1/0550/4260/5277/products/babys-room_925x_b19e8b03-3223-43f8-8ea9-c6b2c8b00ba0.jpg?v=1633515775',
              src: 'https://cdn.shopify.com/s/files/1/0550/4260/5277/products/babys-room_925x_b19e8b03-3223-43f8-8ea9-c6b2c8b00ba0.jpg?v=1633515775',
              width: 925,
              height: 617,
              url: 'https://cdn.shopify.com/s/files/1/0550/4260/5277/products/babys-room_925x_b19e8b03-3223-43f8-8ea9-c6b2c8b00ba0.jpg?v=1633515775',
              alt: 'Antique Drawers (6643365576925)',
              attached_to_variant: false,
            },
          },
        ],
        options: ['Title'],
        price_max: 250,
        price_min: 250,
        price_varies: false,
        published_at: '2021-10-02T04:40:52Z',
        created_at: '2021-10-02T04:40:52Z',
        type: 'Indoor',
        tags: ['Antique', 'Bedroom'],
        variants: [
          {
            compare_at_price: 300,
            id: '39474986123485',
            inventory_management: 'NOT_MANAGED',
            options: ['Default Title'],
            price: 250,
            requires_shipping: true,
            title: 'Default Title',
            weight: 0,
            inventory_quantity: -99,
            available: true,
          },
        ],
        price: 250,
        featured_media: {
          alt: 'Antique Drawers (6643365576925)',
          id: '20557979648221',
          position: 1,
          preview_image: {
            created_at: 'Fri Mar 18 08:46:46 UTC 2022',
            updated_at: 'Fri Mar 18 08:46:46 UTC 2022',
            aspect_ratio: 1.4991896,
            id: '20557979648221',
            media_type: 'image',
            src: 'https://cdn.shopify.com/s/files/1/0550/4260/5277/products/babys-room_925x_b19e8b03-3223-43f8-8ea9-c6b2c8b00ba0.jpg?v=1633515775',
            width: 925,
            height: 617,
            alt: 'Antique Drawers (6643365576925)',
            attached_to_variant: false,
          },
        },
        options_with_values: [
          {
            name: 'Title',
            position: 1,
            values: ['Default Title'],
            selected_value: 'Default Title',
          },
        ],
        first_available_variant: {
          compare_at_price: 300,
          id: '39474986123485',
          inventory_management: 'NOT_MANAGED',
          options: ['Default Title'],
          price: 250,
          requires_shipping: true,
          title: 'Default Title',
          weight: 0,
          inventory_quantity: -99,
          available: true,
        },
        selected_or_first_available_variant: {
          compare_at_price: 300,
          id: '39474986123485',
          inventory_management: 'NOT_MANAGED',
          options: ['Default Title'],
          price: 250,
          requires_shipping: true,
          title: 'Default Title',
          weight: 0,
          inventory_quantity: -99,
          available: true,
        },
        url: 'products/antique-drawers',
      },
      {
        id: '6643366789341',
        object_type: 'product',
        gift_card: true,
        title: 'Stylish Summer Necklace',
        vendor: 'Company 123',
        handle: 'stylish-summer-neclace',
        available: true,
        content: '<p>Double chained gold boho necklace with turquoise pendant.</p>',
        description: '<p>Double chained gold boho necklace with turquoise pendant.</p>',
        featured_image: {
          created_at: 'Fri Mar 18 08:46:46 UTC 2022',
          updated_at: 'Fri Mar 18 08:46:46 UTC 2022',
          aspect_ratio: 1.4991896,
          id: '28304278782173',
          media_type: 'image',
          preview_image: 'https://cdn.shopify.com/s/files/1/0616/9480/4174/products/20045689-1-white.jpg?v=1652169246',
          src: 'https://cdn.shopify.com/s/files/1/0616/9480/4174/products/20045689-1-white.jpg?v=1652169246',
          width: 925,
          height: 617,
          url: 'https://cdn.shopify.com/s/files/1/0616/9480/4174/products/20045689-1-white.jpg?v=1652169246',
          alt: 'Stylish Summer Necklace (6643366789341)',
          attached_to_variant: false,
        },
        images: [
          {
            created_at: 'Fri Mar 18 08:46:46 UTC 2022',
            updated_at: 'Fri Mar 18 08:46:46 UTC 2022',
            aspect_ratio: 1.4991896,
            id: '28304278782173',
            media_type: 'image',
            preview_image:
              'https://cdn.shopify.com/s/files/1/0550/4260/5277/products/stylish-summer-necklace_925x_3acca39b-477e-45e5-b7ce-c18755e6bcb7.jpg?v=1633515804',
            src:
              'https://cdn.shopify.com/s/files/1/0550/4260/5277/products/stylish-summer-necklace_925x_3acca39b-477e-45e5-b7ce-c18755e6bcb7.jpg?v=1633515804',
            width: 925,
            height: 617,
            url:
              'https://cdn.shopify.com/s/files/1/0550/4260/5277/products/stylish-summer-necklace_925x_3acca39b-477e-45e5-b7ce-c18755e6bcb7.jpg?v=1633515804',
            alt: 'Stylish Summer Necklace (6643366789341)',
            attached_to_variant: false,
          },
        ],
        media: [
          {
            alt: 'Stylish Summer Necklace (6643366789341)',
            id: '20557981614301',
            position: 'IMAGE',
            preview_image: {
              created_at: 'Fri Mar 18 08:46:46 UTC 2022',
              updated_at: 'Fri Mar 18 08:46:46 UTC 2022',
              aspect_ratio: 1.4991896,
              id: '20557981614301',
              media_type: 'image',
              preview_image:
                'https://cdn.shopify.com/s/files/1/0550/4260/5277/products/stylish-summer-necklace_925x_3acca39b-477e-45e5-b7ce-c18755e6bcb7.jpg?v=1633515804',
              src:
                'https://cdn.shopify.com/s/files/1/0550/4260/5277/products/stylish-summer-necklace_925x_3acca39b-477e-45e5-b7ce-c18755e6bcb7.jpg?v=1633515804',
              width: 925,
              height: 617,
              url:
                'https://cdn.shopify.com/s/files/1/0550/4260/5277/products/stylish-summer-necklace_925x_3acca39b-477e-45e5-b7ce-c18755e6bcb7.jpg?v=1633515804',
              alt: 'Stylish Summer Necklace (6643366789341)',
              attached_to_variant: false,
            },
          },
        ],
        options: ['Title'],
        price_max: 45,
        price_min: 45,
        price_varies: false,
        published_at: '2021-10-02T04:42:11Z',
        created_at: '2021-10-02T04:42:11Z',
        type: 'Necklace',
        tags: ['Gold', 'Turquoise'],
        variants: [
          {
            id: '39474987434205',
            inventory_management: 'NOT_MANAGED',
            options: ['Default Title'],
            price: 45,
            requires_shipping: true,
            title: 'Default Title',
            weight: 0,
            inventory_quantity: 1,
            available: true,
          },
        ],
        price: 45,
        featured_media: {
          alt: 'Stylish Summer Necklace (6643366789341)',
          id: '20557981614301',
          position: 1,
          preview_image: {
            created_at: 'Fri Mar 18 08:46:46 UTC 2022',
            updated_at: 'Fri Mar 18 08:46:46 UTC 2022',
            aspect_ratio: 1.4991896,
            id: '20557981614301',
            media_type: 'image',
            src:
              'https://cdn.shopify.com/s/files/1/0550/4260/5277/products/stylish-summer-necklace_925x_3acca39b-477e-45e5-b7ce-c18755e6bcb7.jpg?v=1633515804',
            width: 925,
            height: 617,
            alt: 'Stylish Summer Necklace (6643366789341)',
            attached_to_variant: false,
          },
        },
        options_with_values: [
          {
            name: 'Title',
            position: 1,
            values: ['Default Title'],
            selected_value: 'Default Title',
          },
        ],
        first_available_variant: {
          id: '39474987434205',
          inventory_management: 'NOT_MANAGED',
          options: ['Default Title'],
          price: 45,
          requires_shipping: true,
          title: 'Default Title',
          weight: 0,
          inventory_quantity: 1,
          available: true,
        },
        selected_or_first_available_variant: {
          id: '39474987434205',
          inventory_management: 'NOT_MANAGED',
          options: ['Default Title'],
          price: 45,
          requires_shipping: true,
          title: 'Default Title',
          weight: 0,
          inventory_quantity: 1,
          available: true,
        },
        url: 'products/stylish-summer-neclace',
      },
      {
        id: '6643366756573',
        object_type: 'product',
        gift_card: true,
        title: 'Silver Threader Necklace',
        vendor: 'Sterling Ltd',
        handle: 'silver-threader-necklace',
        available: true,
        compare_at_price: 20,
        compare_at_price_max: 20,
        compare_at_price_min: 20,
        compare_at_price_varies: false,
        content: '<p>Sterling silver chain thread through circle necklace.</p>',
        description: '<p>Sterling silver chain thread through circle necklace.</p>',
        featured_image: {
          created_at: 'Fri Mar 18 08:46:46 UTC 2022',
          updated_at: 'Fri Mar 18 08:46:46 UTC 2022',
          aspect_ratio: 0.66787004,
          id: '28304278716637',
          media_type: 'image',
          preview_image: 'https://cdn.shopify.com/s/files/1/0616/9480/4174/products/dmist3003966540_q1_2-0.jpg?v=1651800024',
          src: 'https://cdn.shopify.com/s/files/1/0616/9480/4174/products/dmist3003966540_q1_2-0.jpg?v=1651800024',
          width: 925,
          height: 1385,
          url: 'https://cdn.shopify.com/s/files/1/0616/9480/4174/products/dmist3003966540_q1_2-0.jpg?v=1651800024',
          alt: 'Silver Threader Necklace (6643366756573)',
          attached_to_variant: false,
        },
        images: [
          {
            created_at: 'Fri Mar 18 08:46:46 UTC 2022',
            updated_at: 'Fri Mar 18 08:46:46 UTC 2022',
            aspect_ratio: 0.66787004,
            id: '28304278716637',
            media_type: 'image',
            preview_image:
              'https://cdn.shopify.com/s/files/1/0550/4260/5277/products/silver-threader-necklace_925x_2db549f9-5fb9-4b20-b623-fe1a560b0e20.jpg?v=1633515803',
            src:
              'https://cdn.shopify.com/s/files/1/0550/4260/5277/products/silver-threader-necklace_925x_2db549f9-5fb9-4b20-b623-fe1a560b0e20.jpg?v=1633515803',
            width: 925,
            height: 1385,
            url:
              'https://cdn.shopify.com/s/files/1/0550/4260/5277/products/silver-threader-necklace_925x_2db549f9-5fb9-4b20-b623-fe1a560b0e20.jpg?v=1633515803',
            alt: 'Silver Threader Necklace (6643366756573)',
            attached_to_variant: false,
          },
          {
            created_at: 'Fri Mar 18 08:46:46 UTC 2022',
            updated_at: 'Fri Mar 18 08:46:46 UTC 2022',
            aspect_ratio: 1.4967637,
            id: '28304278749405',
            media_type: 'image',
            preview_image:
              'https://cdn.shopify.com/s/files/1/0550/4260/5277/products/threader-necklace-closeup_925x_9e1aaa98-fd08-497c-963e-985422b69070.jpg?v=1633515803',
            src:
              'https://cdn.shopify.com/s/files/1/0550/4260/5277/products/threader-necklace-closeup_925x_9e1aaa98-fd08-497c-963e-985422b69070.jpg?v=1633515803',
            width: 925,
            height: 618,
            url:
              'https://cdn.shopify.com/s/files/1/0550/4260/5277/products/threader-necklace-closeup_925x_9e1aaa98-fd08-497c-963e-985422b69070.jpg?v=1633515803',
            alt: 'Silver Threader Necklace (6643366756573)',
            attached_to_variant: false,
          },
        ],
        media: [
          {
            alt: 'Silver Threader Necklace (6643366756573)',
            id: '20557981548765',
            position: 'IMAGE',
            preview_image: {
              created_at: 'Fri Mar 18 08:46:46 UTC 2022',
              updated_at: 'Fri Mar 18 08:46:46 UTC 2022',
              aspect_ratio: 0.66787004,
              id: '20557981548765',
              media_type: 'image',
              preview_image:
                'https://cdn.shopify.com/s/files/1/0550/4260/5277/products/silver-threader-necklace_925x_2db549f9-5fb9-4b20-b623-fe1a560b0e20.jpg?v=1633515803',
              src:
                'https://cdn.shopify.com/s/files/1/0550/4260/5277/products/silver-threader-necklace_925x_2db549f9-5fb9-4b20-b623-fe1a560b0e20.jpg?v=1633515803',
              width: 925,
              height: 1385,
              url:
                'https://cdn.shopify.com/s/files/1/0550/4260/5277/products/silver-threader-necklace_925x_2db549f9-5fb9-4b20-b623-fe1a560b0e20.jpg?v=1633515803',
              alt: 'Silver Threader Necklace (6643366756573)',
              attached_to_variant: false,
            },
          },
          {
            alt: 'Silver Threader Necklace (6643366756573)',
            id: '20557981581533',
            position: 'IMAGE',
            preview_image: {
              created_at: 'Fri Mar 18 08:46:46 UTC 2022',
              updated_at: 'Fri Mar 18 08:46:46 UTC 2022',
              aspect_ratio: 1.4967637,
              id: '20557981581533',
              media_type: 'image',
              preview_image:
                'https://cdn.shopify.com/s/files/1/0550/4260/5277/products/threader-necklace-closeup_925x_9e1aaa98-fd08-497c-963e-985422b69070.jpg?v=1633515803',
              src:
                'https://cdn.shopify.com/s/files/1/0550/4260/5277/products/threader-necklace-closeup_925x_9e1aaa98-fd08-497c-963e-985422b69070.jpg?v=1633515803',
              width: 925,
              height: 618,
              url:
                'https://cdn.shopify.com/s/files/1/0550/4260/5277/products/threader-necklace-closeup_925x_9e1aaa98-fd08-497c-963e-985422b69070.jpg?v=1633515803',
              alt: 'Silver Threader Necklace (6643366756573)',
              attached_to_variant: false,
            },
          },
        ],
        options: ['Title'],
        price_max: 15,
        price_min: 15,
        price_varies: false,
        published_at: '2021-10-02T04:42:09Z',
        created_at: '2021-10-02T04:42:10Z',
        type: 'Necklace',
        tags: ['Silver'],
        variants: [
          {
            compare_at_price: 20,
            id: '39474987401437',
            inventory_management: 'NOT_MANAGED',
            options: ['Default Title'],
            price: 15,
            requires_shipping: true,
            title: 'Default Title',
            weight: 0,
            inventory_quantity: 1,
            available: true,
          },
        ],
        price: 15,
        featured_media: {
          alt: 'Silver Threader Necklace (6643366756573)',
          id: '20557981548765',
          position: 1,
          preview_image: {
            created_at: 'Fri Mar 18 08:46:46 UTC 2022',
            updated_at: 'Fri Mar 18 08:46:46 UTC 2022',
            aspect_ratio: 0.66787004,
            id: '20557981548765',
            media_type: 'image',
            src:
              'https://cdn.shopify.com/s/files/1/0550/4260/5277/products/silver-threader-necklace_925x_2db549f9-5fb9-4b20-b623-fe1a560b0e20.jpg?v=1633515803',
            width: 925,
            height: 1385,
            alt: 'Silver Threader Necklace (6643366756573)',
            attached_to_variant: false,
          },
        },
        options_with_values: [
          {
            name: 'Title',
            position: 1,
            values: ['Default Title'],
            selected_value: 'Default Title',
          },
        ],
        first_available_variant: {
          compare_at_price: 20,
          id: '39474987401437',
          inventory_management: 'NOT_MANAGED',
          options: ['Default Title'],
          price: 15,
          requires_shipping: true,
          title: 'Default Title',
          weight: 0,
          inventory_quantity: 1,
          available: true,
        },
        selected_or_first_available_variant: {
          compare_at_price: 20,
          id: '39474987401437',
          inventory_management: 'NOT_MANAGED',
          options: ['Default Title'],
          price: 15,
          requires_shipping: true,
          title: 'Default Title',
          weight: 0,
          inventory_quantity: 1,
          available: true,
        },
        url: 'products/silver-threader-necklace',
      },
      {
        body_html:
          '<meta charset="utf-8"><span> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec gravida tincidunt euismod. Mauris lacus mi, vulputate eget sem vitae, imperdiet consectetur urna. In ante sapien, mattis eu nisi ut, malesuada fringilla massa. Ut pulvinar, quam quis interdum convallis, sem dolor ullamcorper lacus, vel tristique felis nunc in risus. Duis ex dolor, commodo vitae metus ac, egestas tincidunt turpis. Morbi leo quam, ornare molestie pellentesque interdum, euismod ut magna. Aliquam tincidunt orci vulputate interdum varius. In posuere cursus bibendum. Aliquam hendrerit magna turpis, eu ullamcorper ipsum tincidunt id. Vestibulum pulvinar pharetra leo et auctor. Cras eget lacinia tellus. Donec ut pretium nulla, porta dignissim lorem. In malesuada condimentum rutrum. Nunc finibus nibh nec nibh ornare finibus. Aenean a tortor sit amet metus aliquet tincidunt. Nulla facilisi. Vestibulum faucibus ipsum ipsum, ut gravida odio pellentesque sit amet. Aliquam facilisis, tortor in consectetur gravida, est diam feugiat arcu, non interdum leo velit et tellus. Etiam rutrum vehicula hendrerit. Nam suscipit, ligula eget dignissim cursus, urna lectus posuere erat, ut egestas odio sem sollicitudin neque. Donec eleifend egestas sapien, non finibus mauris dapibus ac. Donec sed metus elementum, gravida augue a, dignissim nisl. Sed elementum non sapien vitae hendrerit.</span>',
        blog_id: 86107357405,
        user_id: 71512260829,
        object_type: 'article',
        summary_html: '',
        template_suffix: '',
        comments: [
          {
            author: 'Soleone',
            content: "Hi author, I really _like_ what you're doing there.",
            created_at: '022-02-03T16:53:36-05:00',
            email: 'sole@one.de',
            id: 653537639,
            status: 'unapproved',
            updated_at: '2022-02-03T16:53:36-05:00',
            url: '',
          },
          {
            author: 'Soleone1',
            content: "Hi author, I really _like_ what you're doing there.",
            created_at: '022-02-03T16:53:36-05:00',
            email: 'sole@one.de',
            id: 653537639,
            status: 'unapproved',
            updated_at: '2022-02-03T16:53:36-05:00',
            url: '',
          },
          {
            author: 'Soleone2',
            content: "Hi author, I really _like_ what you're doing there.",
            created_at: '022-02-03T16:53:36-05:00',
            email: 'sole@one.de',
            id: 653537639,
            status: 'unapproved',
            updated_at: '2022-02-03T16:53:36-05:00',
            url: '',
          },
        ],
        comments_count: 3,
        comments_enabled: true,
        author: 'NGUYEN NGUYEN',
        created_at: '2022-03-18T16:02:34+07:00',
        handle: 'style-advice-all-men-should-hear',
        id: 587206164701,
        image: {
          created_at: 'Fri Mar 18 09:36:21 UTC 2022',
          updated_at: 'Fri Mar 18 09:36:21 UTC 2022',
          aspect_ratio: 1.5003394,
          media_type: 'image',
          src: 'https://cdn.shopify.com/s/files/1/0550/4260/5277/articles/dark-black-bitcoins-2210x1473.jpg?v=1647594155',
          width: 2210,
          height: 1473,
          attached_to_variant: false,
        },
        published_at: '2022-03-18T16:02:34+07:00',
        tags: '',
        title: 'STYLE ADVICE ALL MEN SHOULD HEAR',
        updated_at: '2022-03-18T16:04:38+07:00',
        content:
          '<meta charset="utf-8"><span> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec gravida tincidunt euismod. Mauris lacus mi, vulputate eget sem vitae, imperdiet consectetur urna. In ante sapien, mattis eu nisi ut, malesuada fringilla massa. Ut pulvinar, quam quis interdum convallis, sem dolor ullamcorper lacus, vel tristique felis nunc in risus. Duis ex dolor, commodo vitae metus ac, egestas tincidunt turpis. Morbi leo quam, ornare molestie pellentesque interdum, euismod ut magna. Aliquam tincidunt orci vulputate interdum varius. In posuere cursus bibendum. Aliquam hendrerit magna turpis, eu ullamcorper ipsum tincidunt id. Vestibulum pulvinar pharetra leo et auctor. Cras eget lacinia tellus. Donec ut pretium nulla, porta dignissim lorem. In malesuada condimentum rutrum. Nunc finibus nibh nec nibh ornare finibus. Aenean a tortor sit amet metus aliquet tincidunt. Nulla facilisi. Vestibulum faucibus ipsum ipsum, ut gravida odio pellentesque sit amet. Aliquam facilisis, tortor in consectetur gravida, est diam feugiat arcu, non interdum leo velit et tellus. Etiam rutrum vehicula hendrerit. Nam suscipit, ligula eget dignissim cursus, urna lectus posuere erat, ut egestas odio sem sollicitudin neque. Donec eleifend egestas sapien, non finibus mauris dapibus ac. Donec sed metus elementum, gravida augue a, dignissim nisl. Sed elementum non sapien vitae hendrerit.</span>',
      },
      {
        object_type: 'page',
        author: 'Veda',
        content:
          "<p>Polina's Potent Potions was started by Polina in 1654.</p>\n<p>We use all-natural locally sourced ingredients for our potions.</p>",
        handle: 'blog',
        id: 83536642113,
        metafields: {},
        published_at: '2022-05-04 17:47:03 -0400',
        template_suffix: '',
        title: 'Blog Page',
        url: '/blog',
      },
      {
        object_type: 'page',
        author: 'Veda',
        content:
          "<p>Polina's Potent Potions was started by Polina in 1654.</p>\n<p>We use all-natural locally sourced ingredients for our potions.</p>",
        handle: 'contact',
        id: 83536642113,
        metafields: {},
        published_at: '2022-05-04 17:47:03 -0400',
        template_suffix: '',
        title: 'Contact Page',
        url: '/contact',
      },
      {
        object_type: 'page',
        author: 'doan',
        content:
          "<p>Polina's Potent Potions was started by Polina in 1654.</p>\n<p>We use all-natural locally sourced ingredients for our potions.</p>",
        handle: 'article',
        id: 83536642113,
        metafields: {},
        published_at: '2022-05-04 17:47:03 -0400',
        template_suffix: '',
        title: 'Article',
        url: '/article',
      },
    ],
    results_count: 7,
    sort_by: 'relevance',
    sort_options: [
      {
        name: 'Alphabetically, A-Z',
        value: 'title-ascending',
      },
    ],
    terms: '',
    types: ['article', 'page', 'product'],
  };
};
