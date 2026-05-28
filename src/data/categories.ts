import type { Category } from '../types'
import rawCategories from './categories.json'

export const categories = rawCategories as unknown as Category[]

export const zones = [
  'Banasree',
  'Gulshan',
  'Dhanmondi',
  'Mirpur',
  'Mohakhali',
  'Uttara',
  'Bashundhara',
  'Motijheel',
]

export const areas: Record<string, string[]> = {
  Banasree: ['Block A', 'Block B', 'Block C', 'Block D'],
  Gulshan: ['Gulshan 1', 'Gulshan 2'],
  Dhanmondi: ['Dhanmondi 1', 'Dhanmondi 2', 'Dhanmondi 27'],
  Mirpur: ['Mirpur 1', 'Mirpur 2', 'Mirpur 10', 'Mirpur 12'],
  Mohakhali: ['DOHS', 'Wireless Gate', 'Amtali'],
  Uttara: ['Sector 1', 'Sector 3', 'Sector 7', 'Sector 10'],
  Bashundhara: ['Block A', 'Block B', 'Block C'],
  Motijheel: ['Dilkusha', 'Arambagh'],
}

export const brandsByCategory: Record<string, string[]> = {
  Beverages: ['Cocola', 'Ifad', 'Kazi Farmas', 'Individual Collection'],
  'Dairy & Eggs': ['Farm Fresh', 'Aarong Dairy', 'Milk Vita'],
  'Bakery & Snacks': ['Olympic', 'Pran', 'Kazi Farmas'],
  'Fresh Fruits & Vegetable': ['Organic Farm', 'Green Valley', 'Fresh Picks'],
  'Meat & Fish': ['Aftab', 'Natore', 'Quality Poultry'],
  'Cooking Oil & Ghee': ['Ifad', 'Individual Collection', 'Farm Fresh', 'Kazi Farmas'],
  Cereals: ['Pran', 'Olympic', 'Ifad', 'Kazi Farmas'],
  Pulses: ['Ifad', 'Pran', 'Olympic', 'Kazi Farmas'],
}

export const allBrands = [
  'Individual Collection',
  'Cocola',
  'Ifad',
  'Kazi Farmas',
  'Farm Fresh',
  'Aarong Dairy',
  'Olympic',
  'Pran',
  'Organic Farm',
  'Green Valley',
  'Fresh Picks',
  'Aftab',
  'Natore',
  'Quality Poultry',
  'Milk Vita',
]
