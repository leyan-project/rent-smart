import {InspectionRoomArt,roomViews} from './InspectionRoomArt';
import type {Item} from './state';
export const reportPhotoViews:Record<string,string>={floor_closeup_movein:roomViews.floor,floor_context_movein:'550 180 675 565',floor_overview_movein:'0 0 1536 1024',drawer_still_movein:roomViews.drawer,mattress_movein:roomViews.mattress,drawer_position_movein_v2:roomViews.drawer,mattress_bare_movein_v2:roomViews.mattress,wardrobe_open_movein_v2:roomViews.wardrobe,window_inspection:roomViews.window,wardrobe_inspection:roomViews.wardrobe};
// Stable evidence IDs retain their meaning. Every Page06 view uses Page05's same image pair.
// A drawer still records appearance; never imply function by substituting an open-drawer state.
export function ReportPhoto({item,id}:{item:Item;id:string}){return <span className="report-photo-art"><InspectionRoomArt view={reportPhotoViews[id]} lifted={item==='mattress'} drawerOpen={id==='drawer_position_movein_v2'} wardrobeOpen={id==='wardrobe_open_movein_v2'} legacy={!id.endsWith('_v2')}/></span>}
