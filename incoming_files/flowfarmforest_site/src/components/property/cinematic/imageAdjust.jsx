// Centralized image brightness/color adjustments from the true-value gallery.
// Each image filename maps to its gallery-calibrated CSS filter string.
// Default fallback brightens all images to match gallery standard.

const ADJUSTMENTS = {
  // Foyer — richer warmth and depth
  'foyer.jpg': 'brightness(1.10) contrast(1.12) saturate(1.08) hue-rotate(-2deg)',
  'foyer5.jpg': 'brightness(1.10) contrast(1.12) saturate(1.08) hue-rotate(-2deg)',
  'foyeryes.jpg': 'brightness(1.10) contrast(1.12) saturate(1.08) hue-rotate(-2deg)',
  'foyersection.jpg': 'brightness(1.08) contrast(1.10) saturate(1.06) hue-rotate(-2deg)',
  'foyer2.jpg': 'brightness(1.08) contrast(1.10) saturate(1.06) hue-rotate(-2deg)',
  'foyergood.jpg': 'brightness(1.08) contrast(1.10) saturate(1.06) hue-rotate(-2deg)',
  // Powder Room
  '260115107LindenTrailF-9727.jpg': 'brightness(1.08) contrast(1.10) saturate(1.06) hue-rotate(-2deg)',
  'architguestpowder.jpg': 'brightness(1.08) contrast(1.10) saturate(1.06) hue-rotate(-2deg)',
  'guestpowder.jpg': 'brightness(1.08) contrast(1.10) saturate(1.06) hue-rotate(-2deg)',
  // Living Room / Great Room — richer warmth and depth
  'fireplace.jpg': 'brightness(1.08) contrast(1.12) saturate(1.08) hue-rotate(-2deg)',
  '260115107LindenTrailF-9610.jpg': 'brightness(1.06) contrast(1.10) saturate(1.06) hue-rotate(-2deg)',
  '260115107LindenTrailF-9622.jpg': 'brightness(1.06) contrast(1.10) saturate(1.06) hue-rotate(-2deg)',
  '260115107LindenTrailF-9619.jpg': 'brightness(1.08) contrast(1.12) saturate(1.08) hue-rotate(-2deg)',
  'livingroom.jpg': 'brightness(1.06) contrast(1.10) saturate(1.06) hue-rotate(-2deg)',
  'livingroom2.jpg': 'brightness(1.08) contrast(1.10) saturate(1.06) hue-rotate(-2deg)',
  'beamliving.jpg': 'brightness(1.06) contrast(1.10) saturate(1.06) hue-rotate(-2deg)',
  'livingroom4.jpg': 'brightness(1.06) contrast(1.10) saturate(1.06) hue-rotate(-2deg)',
  // Kitchen
  'SUNSHINEKITCHEN.jpg': 'brightness(1.18) contrast(1.06) saturate(0.86) hue-rotate(-5deg)',
  'KITCHEN1.jpg': 'brightness(1.32) contrast(1.08) saturate(0.84) hue-rotate(-8deg)',
  'WOLFCLOSEUP.jpg': 'brightness(1.36) contrast(1.10) saturate(0.78) hue-rotate(-10deg)',
  'kitchenok.jpg': 'brightness(1.32) contrast(1.06) saturate(0.86) hue-rotate(-7deg)',
  'KTOCONS.jpg': 'brightness(1.22) contrast(1.06) saturate(0.86) hue-rotate(-7deg)',
  'KITCHEN2.jpg': 'brightness(1.36) contrast(1.10) saturate(0.78) hue-rotate(-10deg)',
  'kitchenbar.jpg': 'brightness(1.12) contrast(1.04) saturate(0.90) hue-rotate(-3deg)',
  'KitchentoConservatory.jpg': 'brightness(1.12) contrast(1.04) saturate(0.90) hue-rotate(-3deg)',
  'KITCHENTOOFFICETOMUD.jpg': 'brightness(1.12) contrast(1.04) saturate(0.90) hue-rotate(-3deg)',
  'KITCHENYES.jpg': 'brightness(1.30) contrast(1.06) saturate(0.86) hue-rotate(-5deg)',
  'Kitchen.jpg': 'brightness(1.12) contrast(1.04) saturate(0.90) hue-rotate(-3deg)',
  'KTC2.jpg': 'brightness(1.12) contrast(1.04) saturate(0.90) hue-rotate(-3deg)',
  'SOGOODKITCHEN.jpg': 'brightness(1.18) contrast(1.06) saturate(0.86) hue-rotate(-5deg)',
  'KITCH.jpg': 'brightness(1.18) contrast(1.06) saturate(0.86) hue-rotate(-5deg)',
  'WOLFDOUBLEGASRANGE.jpg': 'brightness(1.36) contrast(1.10) saturate(0.78) hue-rotate(-10deg)',
  'CUSTOMWOODSINK.jpg': 'brightness(1.12) contrast(1.04) saturate(0.90) hue-rotate(-3deg)',
  // Scullery
  'SCULLERYSINKGLASSTILEBACKSPLASHGRANITECOUNTERS.jpg': 'brightness(1.16) contrast(1.12) saturate(1.06) hue-rotate(-3deg)',
  'SCULLERY.jpg': 'brightness(1.16) contrast(1.12) saturate(1.06) hue-rotate(-3deg)',
  'SCULLERYSINK.jpg': 'brightness(1.16) contrast(1.12) saturate(1.06) hue-rotate(-3deg)',
  // Kitchen Hallway
  'HEARTPINEHALLWAYWITHBUILTINDESK.jpg': 'brightness(1.32) contrast(1.06) saturate(0.92) hue-rotate(-3deg)',
  'HALLOFFICE.jpg': 'brightness(1.32) contrast(1.06) saturate(0.92) hue-rotate(-3deg)',
  'TOMUDROOMFROMKITCHENOFFICE.jpg': 'brightness(1.32) contrast(1.06) saturate(0.92) hue-rotate(-3deg)',
  // Dining Room
  'sogoodtolivingroom.jpg': 'brightness(1.14) contrast(1.05) saturate(0.88) hue-rotate(-5deg)',
  'verticaldiningroom.jpg': 'brightness(1.22) contrast(1.05) saturate(0.88) hue-rotate(-5deg)',
  'DININGROOM.jpg': 'brightness(1.14) contrast(1.05) saturate(0.88) hue-rotate(-5deg)',
  'dininghori.jpg': 'brightness(1.12) contrast(1.04) saturate(0.90) hue-rotate(-3deg)',
  // Conservatory — already color-corrected in gallery, use identity filter
  'CONSERVATORYBEST.jpg': 'none',
  'MONEYSHOT.jpg': 'none',
  '260115107LindenTrailF-9565.jpg': 'none',
  'CONSER.jpg': 'none',
  'CUSTOMHUTCH.jpg': 'none',
  'CONSERV3.jpg': 'none',
  'SUNSHINECONSERVATORY.jpg': 'none',
  // Screened Porch
  'patio2.jpg': 'brightness(1.16) contrast(1.04) saturate(0.90) hue-rotate(-3deg)',
  'patio.jpg': 'brightness(1.16) contrast(1.04) saturate(0.90) hue-rotate(-3deg)',
  'patio4.jpg': 'brightness(1.16) contrast(1.04) saturate(0.90) hue-rotate(-3deg)',
  // Primary Suite — brightened, bathrooms extra bright
  'entrancetoprimarty.jpg': 'brightness(1.14) contrast(1.03) saturate(1.04)',
  'primary1main.jpg': 'brightness(1.14) contrast(1.03) saturate(1.04)',
  'primary.jpg': 'brightness(1.14) contrast(1.03) saturate(1.04)',
  'primary1pic2.jpg': 'brightness(1.14) contrast(1.03) saturate(1.04)',
  'tightshotsitroomprimary.jpg': 'brightness(1.14) contrast(1.03) saturate(1.04)',
  'primarywidetositrom.jpg': 'brightness(1.14) contrast(1.03) saturate(1.04)',
  'spaprimarybath.jpg': 'brightness(1.22) contrast(1.05) saturate(1.06)',
  'primarybathgoodtoclosetdoor.jpg': 'brightness(1.22) contrast(1.05) saturate(1.06)',
  'primarytightshottubandshower.jpg': 'brightness(1.22) contrast(1.05) saturate(1.06)',
  'architecmasterbathwateron.jpg': 'brightness(1.22) contrast(1.05) saturate(1.06)',
  'closeupcenterislandprimarycloset.jpg': 'brightness(1.16) contrast(1.04) saturate(1.04)',
  'fullshotprimcloset.jpg': 'brightness(1.16) contrast(1.04) saturate(1.04)',
  'primaryclosetgreatshot.jpg': 'brightness(1.16) contrast(1.04) saturate(1.04)',
  'PrimarySuiteClosetSafe.jpg': 'brightness(1.16) contrast(1.04) saturate(1.04)',
  // Family Wing — natural rendering, no heavy color shift
  'Winglivingroom.jpg': 'brightness(1.08) contrast(1.04) saturate(1.0)',
  'wingbedroom1.jpg': 'brightness(1.08) contrast(1.04) saturate(1.0)',
  'wingbathroomgood.jpg': 'brightness(1.06) contrast(1.04) saturate(1.02)',
  'wingbathroom.jpg': 'brightness(1.06) contrast(1.04) saturate(1.02)',
  'wingbathroomshowerglasstilecustom.jpg': 'brightness(1.06) contrast(1.04) saturate(1.02)',
  'wingbedroom2.jpg': 'brightness(1.08) contrast(1.04) saturate(1.0)',
  '260115107LindenTrailF-9658.jpg': 'brightness(1.08) contrast(1.04) saturate(1.0)',
  'kidbed21pic.jpg': 'brightness(1.08) contrast(1.04) saturate(1.0)',
  'kidbedroom2secondpic.jpg': 'brightness(1.08) contrast(1.04) saturate(1.0)',
  'verticalshotkid2glassshower.jpg': 'brightness(1.06) contrast(1.04) saturate(1.02)',
  'kidbath2wide.jpg': 'brightness(1.06) contrast(1.04) saturate(1.02)',
  'laundrytoom.jpg': 'brightness(1.10) contrast(1.06) saturate(1.0)',
  'laundryroom2.jpg': 'brightness(1.10) contrast(1.06) saturate(1.0)',
  'laundryperk.jpg': 'brightness(1.10) contrast(1.06) saturate(1.0)',
  // Mudroom & Service Wing — boosted for warmth and depth
  '260115107LindenTrailF-9475-2.jpg': 'brightness(1.22) contrast(1.10) saturate(0.92) hue-rotate(-4deg)',
  'MUDROOM3.jpg': 'brightness(1.20) contrast(1.10) saturate(0.94) hue-rotate(-3deg)',
  'MUDROOM.jpg': 'brightness(1.22) contrast(1.08) saturate(0.92) hue-rotate(-3deg)',
  'mudroom2doorentrances.jpg': 'brightness(1.08) contrast(1.10) saturate(0.95) hue-rotate(-2deg)',
  'MUDDPOWDERROOM.jpg': 'brightness(1.22) contrast(1.10) saturate(0.94) hue-rotate(-3deg)',
  'MUDROOMLAUNDRY.jpg': 'brightness(1.24) contrast(1.10) saturate(0.92) hue-rotate(-3deg)',
  // Second Floor — Executive Office
  'markofficemoneyshot.jpg': 'brightness(1.10) contrast(1.05) saturate(0.88) hue-rotate(-4deg)',
  'tojoffice.jpg': 'brightness(1.10) contrast(1.05) saturate(0.88) hue-rotate(-4deg)',
  'architecmarkofficetallbeampic.jpg': 'brightness(1.12) contrast(1.04) saturate(0.90) hue-rotate(-3deg)',
  'markoffice1.jpg': 'brightness(1.12) contrast(1.04) saturate(0.90) hue-rotate(-3deg)',
  'joffice2.jpg': 'brightness(1.12) contrast(1.04) saturate(0.90) hue-rotate(-3deg)',
  'Jofficeoffcloet.jpg': 'brightness(1.12) contrast(1.04) saturate(0.90) hue-rotate(-3deg)',
  'nookinthinktankshowingwindows.jpg': 'brightness(1.12) contrast(1.04) saturate(0.90) hue-rotate(-3deg)',
  // Second Floor — Think Tank / Guest Suite
  'thinktankmain.jpg': 'brightness(1.12) contrast(1.04) saturate(0.90) hue-rotate(-3deg)',
  'thinktankorbedroom2.jpg': 'brightness(1.12) contrast(1.04) saturate(0.90) hue-rotate(-3deg)',
  'thinktankorbedroom.jpg': 'brightness(1.12) contrast(1.04) saturate(0.90) hue-rotate(-3deg)',
  'GuestSuiteSecondFloor.jpg': 'brightness(1.12) contrast(1.04) saturate(0.90) hue-rotate(-3deg)',
  'GuestSuite2.jpg': 'brightness(1.12) contrast(1.04) saturate(0.90) hue-rotate(-3deg)',
  'GuestSuite3.jpg': 'brightness(1.12) contrast(1.04) saturate(0.90) hue-rotate(-3deg)',
  'fullbathsecondarchitshotwithwindow.jpg': 'brightness(1.12) contrast(1.04) saturate(0.90) hue-rotate(-3deg)',
  'fullbathsecondfloorshowertub.jpg': 'brightness(1.12) contrast(1.04) saturate(0.90) hue-rotate(-3deg)',
  'fullbathsecondfloor.jpg': 'brightness(1.12) contrast(1.04) saturate(0.90) hue-rotate(-3deg)',
  // Second Floor — Guest Apartment
  'GUESTSUITESITTINGROOM.jpg': 'brightness(1.22) contrast(1.05) saturate(0.88) hue-rotate(-4deg)',
  'SITTINGROOMGUESTSUITE.jpg': 'brightness(1.22) contrast(1.05) saturate(0.88) hue-rotate(-4deg)',
  'GUESTSUITEKITCHENETTE.jpg': 'brightness(1.22) contrast(1.05) saturate(0.88) hue-rotate(-4deg)',
  'GUESTSUITETRAYCEILING.jpg': 'brightness(1.22) contrast(1.05) saturate(0.88) hue-rotate(-4deg)',
  'CUSTOMGLASSTILESHOWER.jpg': 'brightness(1.22) contrast(1.05) saturate(0.88) hue-rotate(-4deg)',
  'GUESTSUITEBATHROOM.jpg': 'brightness(1.22) contrast(1.05) saturate(0.88) hue-rotate(-4deg)',
  // Second Floor — Corridors
  'Architectfeatureslonghallwaywideshotsecondfloor.jpg': 'brightness(1.12) contrast(1.04) saturate(0.90) hue-rotate(-3deg)',
  'secondfloorhallway.jpg': 'brightness(1.12) contrast(1.04) saturate(0.90) hue-rotate(-3deg)',
  'HEARTPINEDETAILTHROUGHSTAIRWAYTOGUESTSUITE.jpg': 'brightness(1.12) contrast(1.04) saturate(0.90) hue-rotate(-3deg)',
  'centerstairwellhouse.jpg': 'brightness(1.12) contrast(1.04) saturate(0.90) hue-rotate(-3deg)',
  'architectqualityhandrails.jpg': 'brightness(1.12) contrast(1.04) saturate(0.90) hue-rotate(-3deg)',
  'fromkidwingtocentralstaircasetosecondfloor.jpg': 'brightness(1.12) contrast(1.04) saturate(0.90) hue-rotate(-3deg)',
  'hallwaytokidwing.jpg': 'brightness(1.22) contrast(1.05) saturate(0.88) hue-rotate(-4deg)',
  // Basement
  'walkoutbasement.jpg': 'brightness(1.16) contrast(1.05) saturate(0.88) hue-rotate(-4deg)',
  'Hometheatre.jpg': 'brightness(1.16) contrast(1.05) saturate(0.88) hue-rotate(-4deg)',
  'MechanicalRoom.jpg': 'brightness(1.16) contrast(1.05) saturate(0.88) hue-rotate(-4deg)',
  'CrawlspaceHvac.jpg': 'brightness(1.16) contrast(1.05) saturate(0.88) hue-rotate(-4deg)',
  'CrawlSpaceSolarBatteries.jpg': 'brightness(1.16) contrast(1.05) saturate(0.88) hue-rotate(-4deg)',
  'MechanicalRoom3.jpg': 'brightness(1.16) contrast(1.05) saturate(0.88) hue-rotate(-4deg)',
  'DoorSaferemoveitems.jpg': 'brightness(1.16) contrast(1.05) saturate(0.88) hue-rotate(-4deg)',
  // Exterior
  '107LindenTrailGrass-65.jpg': 'brightness(1.04) contrast(1.01) saturate(0.88) hue-rotate(-2deg)',
  '107LindenTrailGrass-66.jpg': 'brightness(1.04) contrast(1.01) saturate(0.88) hue-rotate(-2deg)',
  '107LindenTrailGrass-67.jpg': 'brightness(1.04) contrast(1.01) saturate(0.88) hue-rotate(-2deg)',
  '107LindenTrailGrass-74.jpg': 'brightness(1.04) contrast(1.01) saturate(0.88) hue-rotate(-2deg)',
  '107LindenTrailGrass-81.jpg': 'brightness(1.04) contrast(1.01) saturate(0.88) hue-rotate(-2deg)',
  '107LindenTrailGrass-77.jpg': 'brightness(1.04) contrast(1.01) saturate(0.88) hue-rotate(-2deg)',
  '107LindenTrailGrass-63.jpg': 'brightness(1.04) contrast(1.01) saturate(0.88) hue-rotate(-2deg)',
  // Cabana
  'CabanaHouseMain.jpg': 'brightness(1.06) contrast(1.02) saturate(0.90) hue-rotate(-2deg)',
  'SideExteriorCabanaHouse.jpg': 'brightness(1.06) contrast(1.02) saturate(0.90) hue-rotate(-2deg)',
  // Estate aerials
  'Goodcrop.jpg': 'brightness(1.04) contrast(1.01) saturate(0.88) hue-rotate(-2deg)',
  // Door images
  'houseadd.jpg': 'brightness(1.08) contrast(1.04) saturate(0.90) hue-rotate(-3deg)',
};

// Default filter when no specific adjustment is found
const DEFAULT_ADJUST = 'brightness(1.12) contrast(1.04) saturate(0.90) hue-rotate(-3deg)';

/**
 * Get the gallery-calibrated CSS filter for any image URL.
 * Extracts the filename from the URL and looks up its adjustment.
 */
export function getImageAdjust(src) {
  if (!src) return DEFAULT_ADJUST;
  // Extract filename after the last underscore prefix (e.g., "3cd0985c9_foyer.jpg" → "foyer.jpg")
  const parts = src.split('/');
  const file = parts[parts.length - 1];
  // Remove the hash prefix (everything before and including first _)
  const cleanName = file.includes('_') ? file.substring(file.indexOf('_') + 1) : file;
  return ADJUSTMENTS[cleanName] || DEFAULT_ADJUST;
}

export default getImageAdjust;