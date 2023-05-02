const shoeColorConfigs = [
  {
    modelUrl: '/model/nike-converse-low-top.gltf',
    name: 'Converse Custom Chuck Taylor All Star Low Top',
    id: 'nike-converse-low-top',
    src: '/images/shoes/nike-converse-low-top.jpeg',
    colorConfigs: [
      {
        colors: [
          '#F4F6EF',
          '#F9F1DF',
          '#B50024',
          '#127048',
          '#008FD2',
          '#34394B',
          '#9A9B9D',
          '#44312E',
          '#221E1F',
        ],
        types: ['lf_quarter_lateral', 'rt_quarter_lateral'],
        title: 'Outside Body',
        show: true,
        modelPosition: {
          x: 1.4022229023529016,
          y: 1.5763595539346935,
          z: -2.520576777950165,
        },
      },
      {
        colors: [
          '#F4F6EF',
          '#F9F1DF',
          '#B50024',
          '#127048',
          '#008FD2',
          '#34394B',
          '#9A9B9D',
          '#44312E',
          '#221E1F',
        ],
        types: ['lf_quarter_medial', 'rt_quarter_medial'],
        title: 'Inside Body',
        show: true,
        modelPosition: {
          x: 2.823991314199918,
          y: 1.7878903777653403,
          z: -1.452715309298491,
        },
      },
      {
        colors: ['#FFFFFF', '#CFF5FE', '#ADB3BB'],
        types: ['lf_toe_cap', 'rt_toe_cap'],
        title: 'Tongue',
        show: false,
        modelPosition: {
          x: 2.977606749619115,
          y: 2.173233234682133,
          z: 0.0026341197430875146,
        },
      },
      {
        colors: ['#88CCEE', '#44AA99', '#117733', '#DDCC77', '#CC6677', '#AA4499', '#88CCEE'],
        types: ['rt_tongue_outer', 'lf_tongue_outer'],
        title: 'Toungue Outer',
        show: true,
        modelPosition: {
          x: 2.977606749619115,
          y: 2.173233234682133,
          z: 0.0026341197430875146,
        },
      },
      {
        colors: ['#7596A4', '#F9B7AB', '#BEE2D4', '#5480A3'],
        types: ['lf_heel_stay', 'rt_heel_stay'],
        title: 'Heal Stripe',
        show: false,
        modelPosition: {
          x: -1.0299898841590989,
          y: 2.124386135135839,
          z: -0.0016450250091937502,
        },
      },
      {
        colors: ['#3E92CC', '#7FCDCD', '#F48FB1', '#2D728F', '#6B5B95', '#F7CAC9', '#F5F5DC'],
        types: ['lf_liner_medial', 'rt_liner_medial', 'lf_liner_lateral', 'rt_liner_lateral'],
        title: 'Lining',
        show: false,
        modelPosition: {
          x: -0.4354405601616895,
          y: 2.832152187505139,
          z: -0.04914204560550159,
        },
      },
      {
        colors: [
          '#A569BD',
          '#F1C40F',
          '#3498DB',
          '#EC407A',
          '#2ECC71',
          '#E74C3C',
          '#1ABC9C',
          '#F39C12',
          '#1E824C',
          '#95A5A6',
        ],
        types: [
          'lf_stiches_tongue',
          'lf_stitches_heel_stay',
          'lf_stitches_inner_counter_binding',
          'lf_stitches_lace_loop',
          'lf_stitches_lateral_outer',
          'lf_stitches_medial_outer_collar',
          'lf_stitches_quarter_lateral_liner',
          'lf_stitches_quarter_medial_liner',
          'rt_stitches_tongue_label',
          'rt_stiches_tongue',
          'rt_stitches_heel_stay',
          'rt_stitches_inner_counter_binding',
          'rt_stitches_lace_loop',
          'rt_stitches_lateral_outer',
          'rt_stitches_medial_outer_collar',
          'rt_stitches_quarter_lateral_liner',
          'rt_stitches_quarter_medial_liner',
          'rt_stitches_tongue_label',
        ],
        title: 'Stitch',
        show: true,
        modelPosition: {
          x: 1.4022229023529016,
          y: 1.5763595539346935,
          z: -2.520576777950165,
        },
      },
      {
        colors: [
          '#F08080',
          '#6495ED',
          '#87CEFA',
          '#FF69B4',
          '#40E0D0',
          '#9ACD32',
          '#FFDAB9',
          '#FFA07A',
        ],
        types: ['lf_lace_a', 'lf_lace_b', 'rt_lace_a', 'rt_lace_b'],
        title: 'Laces',
        show: true,
        modelPosition: {
          x: 3.051502032155027,
          y: 2.0010958107433243,
          z: -0.02069542851436154,
        },
      },
      {
        colors: [
          '#B0E0E6',
          '#BDB76B',
          '#4682B4',
          '#F08080',
          '#FF6347',
          '#87CEEB',
          '#D2B48C',
          '#90EE90',
        ],
        types: [
          'lf_midsole_tape_a',
          'lf_midsole_tape_b',
          'lf_midsole_tape_c',
          'rt_midsole_tape_a',
          'rt_midsole_tape_b',
          'rt_midsole_tape_c',
        ],
        title: 'Rubber',
        show: true,
        modelPosition: {
          x: 1.5246652317257827,
          y: 0.7191242943754226,
          z: -2.7241622522032856,
        },
      },
      {
        colors: ['#FED63C', '#E48F3D', '#2F6E55', '#B6011F'],
        stripe: {},
        types: [
          'lf_midsole_pinstripe',
          'lf_midsole_topline',
          'rt_midsole_pinstripe',
          'rt_midsole_topline',
        ],
        title: 'Racing Stripe',
        show: true,
        modelPosition: {
          x: 1.524262654907004,
          y: 0.7272867713954555,
          z: -2.7220719963467888,
        },
      },
    ],
  },
  {
    modelUrl: '/model/nike-converse-high-top.gltf',
    name: 'Converse Custom Chuck Taylor All Star High Top',
    id: 'nike-converse-high-top',
    src: '/images/shoes/nike-converse-high-top.jpeg',
    colorConfigs: [
      {
        colors: [
          '#F4F6EF',
          '#F9F1DF',
          '#B50024',
          '#127048',
          '#008FD2',
          '#34394B',
          '#9A9B9D',
          '#44312E',
          '#221E1F',
        ],
        types: ['lf_lateral_outer_collar', 'rt_lateral_outer_collar'],
        title: 'Outside Body',
        show: true,
        modelPosition: {
          x: 1.4022229023529016,
          y: 1.5763595539346935,
          z: -2.520576777950165,
        },
      },
      {
        colors: [
          '#F4F6EF',
          '#F9F1DF',
          '#B50024',
          '#127048',
          '#008FD2',
          '#34394B',
          '#9A9B9D',
          '#44312E',
          '#221E1F',
        ],
        types: ['lf_medial_outer_collar', 'rt_medial_outer_collar'],
        title: 'Inside Body',
        show: true,
        modelPosition: {
          x: 2.823991314199918,
          y: 1.7878903777653403,
          z: -1.452715309298491,
        },
      },
      {
        colors: ['#FFFFFF', '#CFF5FE', '#ADB3BB'],
        types: ['lf_toe_cap', 'rt_toe_cap'],
        title: 'Tongue',
        show: false,
        modelPosition: {
          x: 2.977606749619115,
          y: 2.173233234682133,
          z: 0.0026341197430875146,
        },
      },
      {
        colors: ['#88CCEE', '#44AA99', '#117733', '#DDCC77', '#CC6677', '#AA4499', '#88CCEE'],
        types: ['lf_tongue_top', 'rt_tongue_top'],
        title: 'Toungue Outer',
        show: true,
        modelPosition: {
          x: 2.977606749619115,
          y: 2.173233234682133,
          z: 0.0026341197430875146,
        },
      },
      {
        colors: ['#7596A4', '#F9B7AB', '#BEE2D4', '#5480A3'],
        types: ['lf_heel_stay', 'rt_heel_stay'],
        title: 'Heal Stripe',
        show: false,
        modelPosition: {
          x: -1.0299898841590989,
          y: 2.124386135135839,
          z: -0.0016450250091937502,
        },
      },
      {
        colors: ['#3E92CC', '#7FCDCD', '#F48FB1', '#2D728F', '#6B5B95', '#F7CAC9', '#F5F5DC'],
        types: [
          'rt_lateral_inner_collar',
          'lf_lateral_inner_collar',
          'rt_medial_inner_collar',
          'lf_medial_inner_collar',
        ],
        title: 'Lining',
        show: false,
        modelPosition: {
          x: -0.4354405601616895,
          y: 2.832152187505139,
          z: -0.04914204560550159,
        },
      },
      {
        colors: [
          '#A569BD',
          '#F1C40F',
          '#3498DB',
          '#EC407A',
          '#2ECC71',
          '#E74C3C',
          '#1ABC9C',
          '#F39C12',
          '#1E824C',
          '#95A5A6',
        ],
        types: [
          'rt_stitch_heel_stay',
          'rt_stitch_lateral_inner_collar',
          'rt_stitch_lateral_outer_collar',
          'rt_stitch_medial_inner_collar',
          'rt_stitch_medial_outer_collar',
          'rt_stitch_tongue',
          'lf_stitch_heel_stay',
          'lf_stitch_lateral_inner_collar',
          'lf_stitch_lateral_outer_collar',
          'lf_stitch_medial_inner_collar',
          'lf_stitch_medial_outer_collar',
          'lf_stitch_tongue',
        ],
        title: 'Stitch',
        show: true,
        modelPosition: {
          x: 1.4022229023529016,
          y: 1.5763595539346935,
          z: -2.520576777950165,
        },
      },
      {
        colors: [
          '#F08080',
          '#6495ED',
          '#87CEFA',
          '#FF69B4',
          '#40E0D0',
          '#9ACD32',
          '#FFDAB9',
          '#FFA07A',
        ],
        types: ['rt_lace', 'lf_lace', 'rt_lace_stay', 'lf_lace_stay'],
        title: 'Laces',
        show: true,
        modelPosition: {
          x: 3.051502032155027,
          y: 2.0010958107433243,
          z: -0.02069542851436154,
        },
      },
      {
        colors: [
          '#B0E0E6',
          '#BDB76B',
          '#4682B4',
          '#F08080',
          '#FF6347',
          '#87CEEB',
          '#D2B48C',
          '#90EE90',
        ],
        types: [
          'lf_midsole_tape_a',
          'lf_midsole_tape_b',
          'lf_midsole_tape_c',
          'rt_midsole_tape_a',
          'rt_midsole_tape_b',
          'rt_midsole_tape_c',
        ],
        title: 'Rubber',
        show: true,
        modelPosition: {
          x: 1.5246652317257827,
          y: 0.7191242943754226,
          z: -2.7241622522032856,
        },
      },
      {
        colors: ['#FED63C', '#E48F3D', '#2F6E55', '#B6011F'],
        stripe: {},
        types: [
          'lf_midsole_pinstripe',
          'lf_midsole_topline',
          'rt_midsole_pinstripe',
          'rt_midsole_topline',
        ],
        title: 'Racing Stripe',
        show: true,
        modelPosition: {
          x: 1.524262654907004,
          y: 0.7272867713954555,
          z: -2.7220719963467888,
        },
      },
    ],
  },
];

export default shoeColorConfigs;
