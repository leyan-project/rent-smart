import {useId} from 'react';
import master from './assets/page05/room-handover.webp';
import legacyInspected from './assets/page05/room-inspected.webp';
import inspected from './assets/polish/room-inspected-v2.webp';
import type {Item} from './state';
export const roomViews:Record<Item,string>={floor:'1020 575 140 100',drawer:'790 350 195 240',mattress:'90 365 545 530',window:'635 0 460 380',wardrobe:'1170 230 366 480'};
// Coordinates refer to one 1536 × 1024 image, not five unrelated photographs.
export const roomMarkers:Record<Item,[number,number]>={floor:[70,60.5],drawer:[58,41],mattress:[23,62],window:[56,20],wardrobe:[90,39]};
export const roomImageSources=[master,inspected];
export interface RoomArtProps{view?:string;lifted?:boolean;drawerOpen?:boolean;windowOpen?:boolean;wardrobeOpen?:boolean;legacy?:boolean}
export function InspectionRoomArt({view='0 0 1536 1024',lifted=false,drawerOpen=false,windowOpen=false,wardrobeOpen=false,legacy=false}:RoomArtProps){const uid=useId().replace(/:/g,'');const [cropX,cropY,cropW,cropH]=view.split(' ').map(Number);const zones=[{id:'bedding',active:lifted,points:'70,350 630,350 630,590 535,800 440,1000 70,1000'},{id:'drawer',active:drawerOpen,points:'807,382 960,382 960,445 807,445'},{id:'window',active:windowOpen,points:'645,0 1080,0 1080,355 645,355'},{id:'wardrobe',active:wardrobeOpen,points:'1205,0 1536,0 1536,1000 1205,1000'}];return <svg className="inspection-room-art" viewBox={view} role="img" aria-label="Simulated move-in scene: a single bed on the left, an oak desk with drawers on the right, a rear window, an oak wardrobe and pale wood flooring." preserveAspectRatio="xMidYMid meet"><defs><clipPath id={`${uid}-view`}><rect x={cropX} y={cropY} width={cropW} height={cropH}/></clipPath>{zones.map(z=><clipPath id={`${uid}-${z.id}`} key={z.id}><polygon points={z.points}/></clipPath>)}</defs><g clipPath={`url(#${uid}-view)`}><image href={master} width="1536" height="1024"/><g>{zones.filter(z=>z.active).map(z=><image className={'inspection-state-image '+z.id} key={z.id} data-layer={z.id} href={legacy?legacyInspected:inspected} width="1536" height="1024" clipPath={`url(#${uid}-${z.id})`}/>)}</g></g></svg>}
