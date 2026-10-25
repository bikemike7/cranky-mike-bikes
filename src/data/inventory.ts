/**
 * FOR SALE INVENTORY
 * ==================
 * Everything on the Repair Studio "For Sale" page comes from the list below.
 * Add, edit, or delete an item here and the page updates automatically.
 *
 * Photos: put image files in `public/inventory/` and list just the file names,
 * e.g. photos: ['blue-commuter-1.jpg', 'blue-commuter-2.jpg']. The first photo
 * is the main one.
 *
 * Copy this template for each new item (fields marked ? are optional):
 *
 *   {
 *     id: 'blue-commuter',            // unique, lowercase, no spaces
 *     name: '1986 Schwinn Le Tour',
 *     category: 'refurbished',        // see InventoryCategory below
 *     price: '$350',                  // written exactly as it should appear
 *     description: 'Fully overhauled, new tires and cables. Great city bike.',
 *     photos: ['schwinn-1.jpg', 'schwinn-2.jpg'],
 *     condition?: 'Good — some paint scuffs',
 *     specs?: { 'Frame size': '56 cm', Gearing: '2x6', Brakes: 'Rim' },
 *     sold?: true,                    // keeps it listed but marked SOLD
 *   },
 */

export type InventoryCategory =
  | 'used'          // used bicycle
  | 'refurbished'   // refurbished bicycle
  | 'custom'        // one of Mike's custom builds
  | 'used-parts'    // secondhand parts & accessories
  | 'new-parts';    // new parts & accessories through dealers

export const CATEGORY_LABELS: Record<InventoryCategory, string> = {
  used: 'Used bike',
  refurbished: 'Refurbished bike',
  custom: 'Custom build',
  'used-parts': 'Secondhand parts',
  'new-parts': 'New parts',
};

export interface InventoryItem {
  id: string;
  name: string;
  category: InventoryCategory;
  price: string;
  description: string;
  photos: string[];
  condition?: string;
  specs?: Record<string, string>;
  sold?: boolean;
}

export const INVENTORY: InventoryItem[] = [
  // No items yet. Add real listings here using the template above.
];
