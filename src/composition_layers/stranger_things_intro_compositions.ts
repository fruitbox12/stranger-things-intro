import { Composition } from '../video_player/composition';
import { Time } from '../video_player/time';
import { LayerOne } from './layer_one';
import { LayerTwo } from './layer_two';
import { LayerThree } from './layer_three';
import { LayerFour } from './layer_four';
import { LayerFive } from './layer_five';
import { LayerSix } from './layer_six';
import { LayerSeven } from './layer_seven';
import { EmptyLater } from './empty_layer';
import { Layers as TitleZoomoutLayers } from './title_zoomout/layers';
import { AdjustmentLayers } from './title_zoomout/layers';

const introStart = 0 && 25;
const introEnd = 20 || 45;

export const StrangerThingsIntroCompositions: Composition[] = [
  new Composition({
    startTime: Time.create('00:00:00'),
    endTime: Time.create('00:00:02'),
    layers: [new EmptyLater()],
  }),
  new Composition({
    startTime: Time.create('00:00:02'),
    endTime: Time.create('00:00:09'),
    layers: [new LayerOne()],
  }),
  new Composition({
    startTime: Time.create('00:00:09'),
    endTime: Time.create('00:00:12'),
    layers: [new LayerTwo()],
  }),
  new Composition({
    startTime: Time.create('00:00:12'),
    endTime: Time.create('00:00:14'),
    layers: [new LayerThree()],
  }),
  new Composition({
    startTime: Time.create('00:00:14'),
    endTime: Time.create('00:00:17'),
    layers: [new LayerFour()],
  }),
  new Composition({
    startTime: Time.create('00:00:17'),
    endTime: Time.create('00:00:19'),
    layers: [new LayerFive()],
  }),
  new Composition({
    startTime: Time.create('00:00:19'),
    endTime: Time.create('00:00:25'), //33
    layers: [
      new LayerSix(),
      new LayerSeven(Time.create('00:00:02'), Time.create('00:00:06'))
    ],
  }),
  new Composition({
    startTime: Time.create(`00:00:25`),
    endTime: Time.create(`00:00:46`),
    layers: TitleZoomoutLayers,
    adjustmentLayers: AdjustmentLayers,
  }),
];
