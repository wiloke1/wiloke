import { Schema, SectionSettings } from 'types/Schema';

interface DataFake {
  liquid: string;
  scss: string;
  js: string;
  settings: SectionSettings;
  schema: Schema;
}

export const dataFake1: DataFake = {
  liquid: `<div component="tabs" class="veda-tabs {{variant}}">
  <div class="veda-tabs__nav">
    {% for tab in tabs %}
      <div class="veda-tabs__link {{tab.active ? 'veda-tabs__link--active' : ''}}">{{tab.label}}</div>
    {% endfor %}
  </div>
  <div class="veda-tabs__content">
    {% for tab in tabs %}
      <div class="veda-tabs__pane">{{tab.text}}</div>
    {% endfor %}
  </div>
</div>`,
  scss: '',
  js: 'veda.plugins.tabs(container);',
  settings: [
    {
      id: 'sdfsdfdfg4',
      type: 'select',
      name: 'variant',
      label: 'Variant',
      options: [
        { id: 'sdf23423425345', label: 'Horizontal', value: 'veda-tabs--horizontal' },
        { id: 'sdsdfsdf34', label: 'Vertical', value: 'veda-tabs--vertical' },
      ],
      children: 'veda-tabs--horizontal',
    },
    {
      id: 'sdfsdfw3532',
      drawer: true,
      name: 'tabs',
      label: 'Tabs',
      open: false,
      type: 'array',
      children: [
        {
          id: '1',
          children: [
            {
              id: 'label1',
              name: 'label',
              label: 'Label',
              type: 'text',
              children: 'Tab 1',
            },
            {
              id: 'text1',
              name: 'text',
              label: 'Text',
              type: 'textarea',
              children: 'Text 1',
            },
            {
              id: 'active1',
              name: 'active',
              label: 'Active',
              type: 'switch',
              children: true,
            },
          ],
        },
        {
          id: '2',
          children: [
            {
              id: 'label2',
              name: 'label',
              label: 'Label',
              type: 'text',
              children: 'Tab 2',
            },
            {
              id: 'text2',
              name: 'text',
              label: 'Text',
              type: 'textarea',
              children: 'Text 2',
            },
            {
              id: 'active2',
              name: 'active',
              label: 'Active',
              type: 'switch',
              children: false,
            },
          ],
        },
        {
          id: '3',
          children: [
            {
              id: 'label3',
              name: 'label',
              label: 'Label',
              type: 'text',
              children: 'Tab 3',
            },
            {
              id: 'text3',
              name: 'text',
              label: 'Text',
              type: 'textarea',
              children: 'Text 3',
            },
            {
              id: 'active3',
              name: 'active',
              label: 'Active',
              type: 'switch',
              children: false,
            },
          ],
        },
      ],
    },
  ],
  schema: {
    settings: [
      {
        id: 'sdfsdfdfg4',
        type: 'select',
        name: 'variant',
        label: 'Variant',
        options: [
          { id: 'sdf23423425345', label: 'Horizontal', value: 'veda-tabs--horizontal' },
          { id: 'sdsdfsdf34', label: 'Vertical', value: 'veda-tabs--vertical' },
        ],
        children: 'veda-tabs--horizontal',
      },
    ],
    blocks: [
      {
        id: 'sdfsdfw3532',
        drawer: true,
        name: 'tabs',
        label: 'Tabs',
        open: false,
        type: 'array',
        children: [
          {
            id: '56456',
            name: 'label',
            label: 'Label',
            type: 'text',
            children: 'Tab',
          },
          {
            id: 'dfgdfgdfg',
            name: 'text',
            label: 'Text',
            type: 'textarea',
            children: 'Text',
          },
          {
            id: '567567',
            name: 'active',
            label: 'Active',
            type: 'switch',
            children: false,
          },
        ],
        max: 10,
      },
    ],
  },
};

export const dataFake2: DataFake = {
  liquid: `<div class="container">
    <div
      class="veda-swiper"
      data-options="{
      speed: 400,
      spaceBetween: 30
      }"
    >
    <div className="swiper">
      <div class="veda-swiper-wrapper swiper-wrapper">
      {% for swiper in swipers %}
        <div component="swipers" class="swiper-slide">{{swiper.text}}</div>
      {% endfor %}
      </div>
    </div>
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
    <div class="swiper-pagination"></div>
  </div>
</div>`,
  scss: `
        #{$container} {
          .swiper-slide {
            padding: 30px;
            border: 1px solid red;
          }
        }
        `,
  js: `veda.plugins.swiper(container);`,
  settings: [
    {
      id: 'sdfsdfw3532',
      drawer: true,
      name: 'swipers',
      label: 'Swiper slider',
      open: false,
      type: 'array',
      children: [
        {
          id: '1',
          children: [
            {
              id: 'text1',
              name: 'text',
              label: 'Text',
              type: 'text',
              children: 'Text 1',
            },
          ],
        },
        {
          id: '2',
          children: [
            {
              id: 'text2',
              name: 'text',
              label: 'Text',
              type: 'text',
              children: 'Text 2',
            },
          ],
        },
        {
          id: '3',
          children: [
            {
              id: 'text3',
              name: 'text',
              label: 'Text',
              type: 'text',
              children: 'Text 3',
            },
          ],
        },
        {
          id: '4',
          children: [
            {
              id: 'text4',
              name: 'text',
              label: 'Text',
              type: 'text',
              children: 'Text 4',
            },
          ],
        },
      ],
    },
  ],
  schema: {
    settings: [],
    blocks: [
      {
        id: 'sdfsdfw3532',
        drawer: true,
        name: 'swipers',
        label: 'Swiper slider',
        open: false,
        type: 'array',
        children: [
          {
            id: 'sdfg456',
            name: 'text',
            label: 'Text',
            type: 'text',
            children: 'Text',
          },
        ],
      },
    ],
  },
};
