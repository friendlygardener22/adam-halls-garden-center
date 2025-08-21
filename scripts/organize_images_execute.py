#!/usr/bin/env python3
"""
Script to organize plant images into categorized folders
"""

import os
import shutil
from pathlib import Path

def organize_images():
    """Organize images into categorized folders"""
    
    # Create base directory
    base_dir = Path("public/images/plants")
    base_dir.mkdir(parents=True, exist_ok=True)
    
    # Image organization mapping
    image_organization = {
        'bearded-iris': [
            '/images/plants/bearded-iris-1.jpeg',  # Bearded Iris
        ],
        'bouganvillia': [
            '/images/plants/bouganvillia-1.jpeg',  # Bougainvillea
        ],
        'boxwood': [
            '/images/plants/boxwood-1.jpg',  # Boxwood
            '/images/plants/boxwood-1.jpg',  # Boxwood
            '/images/plants/boxwood-1.jpg',  # Boxwood
            '/images/plants/boxwood-1.jpg',  # Boxwood
            '/images/plants/boxwood-1.jpg',  # Boxwood
        ],
        'daylily': [
            '/images/plants/daylily-1.jpg',  # Daylily
            '/images/plants/daylily-1.jpg',  # Daylily
        ],
        'fullsizerender': [
            '/images/plants/fullsizerender-1.jpeg',  # Bird Of Paradise
        ],
        'generic': [
            '/images/plants/nursery-1.jpeg',  # Bush 1gallon
            '/images/plants/nursery-1.jpeg',  # Bush 5gallon
            '/images/plants/nursery-1.jpeg',  # Giant Bird Of Paradise 5 Gallon
            '/images/plants/nursery-1.jpeg',  # Pygmy Palm 14"
            '/images/plants/nursery-1.jpeg',  # Pygmy Palm 17"
            '/images/plants/nursery-1.jpeg',  # Queen Palms 25
            '/images/plants/nursery-1.jpeg',  # Shade Tree 15 Gallon
            '/images/plants/nursery-1.jpeg',  # Ground Cover
            '/images/plants/nursery-1.jpeg',  # Fruit
            '/images/plants/nursery-1.jpeg',  # Fruit Tree
            '/images/plants/nursery-1.jpeg',  # Crown of Thorn
            '/images/plants/nursery-1.jpeg',  # Ficus
            '/images/plants/nursery-1.jpeg',  # Ground Cover
            '/images/plants/nursery-1.jpeg',  # 15 Gal Empty
            '/images/plants/nursery-1.jpeg',  # 15 Gal Empty
            '/images/plants/nursery-1.jpeg',  # 36" Box Shade
            '/images/plants/nursery-1.jpeg',  # Citrus
            '/images/plants/nursery-1.jpeg',  # Abelia Kaleidoscope
            '/images/plants/nursery-1.jpeg',  # Agapanthus Varigated
            '/images/plants/nursery-1.jpeg',  # Agapantus
            '/images/plants/nursery-1.jpeg',  # Agava
            '/images/plants/nursery-1.jpeg',  # Agava
            '/images/plants/nursery-1.jpeg',  # Agava Blue Flame
            '/images/plants/nursery-1.jpeg',  # Agava Wber Arizonia Star
            '/images/plants/nursery-1.jpeg',  # Agave
            '/images/plants/nursery-1.jpeg',  # Agave Americana
            '/images/plants/nursery-1.jpeg',  # Agave Parryi
            '/images/plants/nursery-1.jpeg',  # Agave Variegata
            '/images/plants/nursery-1.jpeg',  # Aleppo Pine
            '/images/plants/nursery-1.jpeg',  # Aloe
            '/images/plants/nursery-1.jpeg',  # Aloe
            '/images/plants/nursery-1.jpeg',  # Alovera
            '/images/plants/nursery-1.jpeg',  # Angel Trumpet
            '/images/plants/nursery-1.jpeg',  # Anonium
            '/images/plants/nursery-1.jpeg',  # Apple
            '/images/plants/nursery-1.jpeg',  # Apricot
            '/images/plants/nursery-1.jpeg',  # Artichoke Agave
            '/images/plants/nursery-1.jpeg',  # Asian Pear
            '/images/plants/nursery-1.jpeg',  # Australian Tree Fern
            '/images/plants/nursery-1.jpeg',  # Bacopa
            '/images/plants/nursery-1.jpeg',  # Bamboo
            '/images/plants/nursery-1.jpeg',  # Bird of Pardise
            '/images/plants/nursery-1.jpeg',  # Blue Fescue
            '/images/plants/nursery-1.jpeg',  # Blue Hibiscus
            '/images/plants/nursery-1.jpeg',  # Blue Juniper
            '/images/plants/nursery-1.jpeg',  # Bottle Brush
            '/images/plants/nursery-1.jpeg',  # Bougainvillea Bush
            '/images/plants/nursery-1.jpeg',  # Bougainvillea Staked
            '/images/plants/nursery-1.jpeg',  # Bouigainvellea Staked
            '/images/plants/nursery-1.jpeg',  # Bower vine
            '/images/plants/nursery-1.jpeg',  # Bush
            '/images/plants/nursery-1.jpeg',  # Bush
            '/images/plants/nursery-1.jpeg',  # Bush
            '/images/plants/nursery-1.jpeg',  # Bush
            '/images/plants/nursery-1.jpeg',  # Bush
            '/images/plants/nursery-1.jpeg',  # Bush
            '/images/plants/nursery-1.jpeg',  # Bush
            '/images/plants/nursery-1.jpeg',  # Butterfly Bush
            '/images/plants/nursery-1.jpeg',  # Cactus
            '/images/plants/nursery-1.jpeg',  # Cactus
            '/images/plants/nursery-1.jpeg',  # Cactus
            '/images/plants/nursery-1.jpeg',  # California Buckwheat
            '/images/plants/nursery-1.jpeg',  # California Fan Palm
            '/images/plants/nursery-1.jpeg',  # California Lilac
            '/images/plants/nursery-1.jpeg',  # California Pepper
            '/images/plants/nursery-1.jpeg',  # California Pepper
            '/images/plants/nursery-1.jpeg',  # Camelia
            '/images/plants/nursery-1.jpeg',  # Camelia Espalier
            '/images/plants/nursery-1.jpeg',  # Camellia
            '/images/plants/nursery-1.jpeg',  # Camphore Tree
            '/images/plants/nursery-1.jpeg',  # Camphore Tree
            '/images/plants/nursery-1.jpeg',  # Canary palm
            '/images/plants/nursery-1.jpeg',  # Cape Honeysuckle
            '/images/plants/nursery-1.jpeg',  # Carex
            '/images/plants/nursery-1.jpeg',  # Carolina Cherry
            '/images/plants/nursery-1.jpeg',  # Carrisa
            '/images/plants/nursery-1.jpeg',  # Catalina Cherry
            '/images/plants/nursery-1.jpeg',  # Chalk stick
            '/images/plants/nursery-1.jpeg',  # Christmas Tree
            '/images/plants/nursery-1.jpeg',  # Cigar Plant
            '/images/plants/nursery-1.jpeg',  # Citrus
            '/images/plants/nursery-1.jpeg',  # Clivia
            '/images/plants/nursery-1.jpeg',  # Color Guard Yucca
            '/images/plants/nursery-1.jpeg',  # Common Rush
            '/images/plants/nursery-1.jpeg',  # Comprazma
            '/images/plants/nursery-1.jpeg',  # Comprazma
            '/images/plants/nursery-1.jpeg',  # Cordyline
            '/images/plants/nursery-1.jpeg',  # Cotoneaste
            '/images/plants/nursery-1.jpeg',  # Cotoneaster
            '/images/plants/nursery-1.jpeg',  # Crape Myrtle
            '/images/plants/nursery-1.jpeg',  # Cottonwood
            '/images/plants/nursery-1.jpeg',  # Crape Myrtle
            '/images/plants/nursery-1.jpeg',  # Crape Myrtle Dark Red Multi
            '/images/plants/nursery-1.jpeg',  # Crape Myrtle Dark Red Standard
            '/images/plants/nursery-1.jpeg',  # Crape Myrtle Watermelon
            '/images/plants/nursery-1.jpeg',  # Crape Myrtle Standard
            '/images/plants/nursery-1.jpeg',  # Creeping Fig
            '/images/plants/nursery-1.jpeg',  # Crown of Thorn
            '/images/plants/nursery-1.jpeg',  # Cuffia
            '/images/plants/nursery-1.jpeg',  # cypress
            '/images/plants/nursery-1.jpeg',  # Date Palm
            '/images/plants/nursery-1.jpeg',  # Deer Grass
            '/images/plants/nursery-1.jpeg',  # Desert Globemallow
            '/images/plants/nursery-1.jpeg',  # Desert Willow
            '/images/plants/nursery-1.jpeg',  # Dianella Verg
            '/images/plants/nursery-1.jpeg',  # Dianells Caerulea "Cassa Blue"
            '/images/plants/nursery-1.jpeg',  # Dragon Fruit
            '/images/plants/nursery-1.jpeg',  # Dwarf Coyote Brush
            '/images/plants/nursery-1.jpeg',  # Dwarf Fruitless Olive
            '/images/plants/nursery-1.jpeg',  # Dwarf Philodendrium
            '/images/plants/nursery-1.jpeg',  # Dwarf Wheeler
            '/images/plants/nursery-1.jpeg',  # Dwf Nandina
            '/images/plants/nursery-1.jpeg',  # Dymondia
            '/images/plants/nursery-1.jpeg',  # Echiverium
            '/images/plants/nursery-1.jpeg',  # ED payment
            '/images/plants/nursery-1.jpeg',  # elephant ear
            '/images/plants/nursery-1.jpeg',  # Empty 36"
            '/images/plants/nursery-1.jpeg',  # Empty 48"
            '/images/plants/nursery-1.jpeg',  # Empty Quart
            '/images/plants/nursery-1.jpeg',  # Escalonia
            '/images/plants/nursery-1.jpeg',  # Eureka Lemon
            '/images/plants/nursery-1.jpeg',  # Ficus
            '/images/plants/nursery-1.jpeg',  # Ficus
            '/images/plants/nursery-1.jpeg',  # Ficus
            '/images/plants/nursery-1.jpeg',  # Fig
            '/images/plants/nursery-1.jpeg',  # Fig
            '/images/plants/nursery-1.jpeg',  # Fire Sticks
            '/images/plants/nursery-1.jpeg',  # Flax
            '/images/plants/nursery-1.jpeg',  # Flax Lily
            '/images/plants/nursery-1.jpeg',  # Flax Rainbow
            '/images/plants/nursery-1.jpeg',  # Forest Pansy
            '/images/plants/nursery-1.jpeg',  # Forset Pansy Redbud
            '/images/plants/nursery-1.jpeg',  # Fountain Grass
            '/images/plants/nursery-1.jpeg',  # Foxtail Agave
            '/images/plants/nursery-1.jpeg',  # Fruit
            '/images/plants/nursery-1.jpeg',  # Fruit Tree
            '/images/plants/nursery-1.jpeg',  # Fruit Tree
            '/images/plants/nursery-1.jpeg',  # Fruit Tree
            '/images/plants/nursery-1.jpeg',  # Fruit Tree
            '/images/plants/nursery-1.jpeg',  # Fruit Tree
            '/images/plants/nursery-1.jpeg',  # Fruit Tree
            '/images/plants/nursery-1.jpeg',  # Fruit Tree
            '/images/plants/nursery-1.jpeg',  # Fruit Tree 15gallon
            '/images/plants/nursery-1.jpeg',  # Fruiting Olive
            '/images/plants/nursery-1.jpeg',  # Fruitless Mulberry
            '/images/plants/nursery-1.jpeg',  # Fruitless Olive
            '/images/plants/nursery-1.jpeg',  # Gardenia
            '/images/plants/nursery-1.jpeg',  # Gardenia Patio Tree
            '/images/plants/nursery-1.jpeg',  # Geranium
            '/images/plants/nursery-1.jpeg',  # Germander
            '/images/plants/nursery-1.jpeg',  # Giant Bird of Paradise
            '/images/plants/nursery-1.jpeg',  # Giant Bird of Paradise
            '/images/plants/nursery-1.jpeg',  # Ginko
            '/images/plants/nursery-1.jpeg',  # Goji Berry
            '/images/plants/nursery-1.jpeg',  # Golden Euonymus
            '/images/plants/nursery-1.jpeg',  # Grape
            '/images/plants/nursery-1.jpeg',  # Grapefruit
            '/images/plants/nursery-1.jpeg',  # Grapefruit
            '/images/plants/nursery-1.jpeg',  # Grapes
            '/images/plants/nursery-1.jpeg',  # Green Glow Agava
            '/images/plants/nursery-1.jpeg',  # Grevillea Noellii
            '/images/plants/nursery-1.jpeg',  # Grewia Occidentails
            '/images/plants/nursery-1.jpeg',  # Grievillia
            '/images/plants/nursery-1.jpeg',  # Ground Cover
            '/images/plants/nursery-1.jpeg',  # Ground Cover Rose
            '/images/plants/nursery-1.jpeg',  # Guava
            '/images/plants/nursery-1.jpeg',  # Halls Honeysuckle
            '/images/plants/nursery-1.jpeg',  # Heavenly Bamboo
            '/images/plants/nursery-1.jpeg',  # Hibiscus
            '/images/plants/nursery-1.jpeg',  # Hong Kong Orchid
            '/images/plants/nursery-1.jpeg',  # Hopseed
            '/images/plants/nursery-1.jpeg',  # Hopseed
            '/images/plants/nursery-1.jpeg',  # Hopseed Bush
            '/images/plants/nursery-1.jpeg',  # Horses Tail
            '/images/plants/nursery-1.jpeg',  # Horses Tail
            '/images/plants/nursery-1.jpeg',  # Hydrangea
            '/images/plants/nursery-1.jpeg',  # Hydrangea
            '/images/plants/nursery-1.jpeg',  # Ice Cream  Bean
            '/images/plants/nursery-1.jpeg',  # Italian Cypress
            '/images/plants/nursery-1.jpeg',  # Italian Cypress
            '/images/plants/nursery-1.jpeg',  # Italian Cyprus
            '/images/plants/nursery-1.jpeg',  # Italian Cyprus
            '/images/plants/nursery-1.jpeg',  # Ivy Geranium
            '/images/plants/nursery-1.jpeg',  # Ixora
            '/images/plants/nursery-1.jpeg',  # Jacaranda
            '/images/plants/nursery-1.jpeg',  # Jacoranda
            '/images/plants/nursery-1.jpeg',  # Jerusalum Sage
            '/images/plants/nursery-1.jpeg',  # JuJubee
            '/images/plants/nursery-1.jpeg',  # Jumbo Queens
            '/images/plants/nursery-1.jpeg',  # Jumbo Sago Palm
            '/images/plants/nursery-1.jpeg',  # Juniper
            '/images/plants/nursery-1.jpeg',  # Kangaroo Paw
            '/images/plants/nursery-1.jpeg',  # King Palm
            '/images/plants/nursery-1.jpeg',  # King Palm
            '/images/plants/nursery-1.jpeg',  # Lambs Ear
            '/images/plants/nursery-1.jpeg',  # Lantana
            '/images/plants/nursery-1.jpeg',  # Lantana Tree
            '/images/plants/nursery-1.jpeg',  # Lavender
            '/images/plants/nursery-1.jpeg',  # Lemon
            '/images/plants/nursery-1.jpeg',  # Lemon Grass
            '/images/plants/nursery-1.jpeg',  # Leyland Cypress
            '/images/plants/nursery-1.jpeg',  # Leyland Cypress
            '/images/plants/nursery-1.jpeg',  # Lilac Bush
            '/images/plants/nursery-1.jpeg',  # Lily Turf
            '/images/plants/nursery-1.jpeg',  # Lime
            '/images/plants/nursery-1.jpeg',  # Lime
            '/images/plants/nursery-1.jpeg',  # Liner Roses
            '/images/plants/nursery-1.jpeg',  # Lion Tails
            '/images/plants/nursery-1.jpeg',  # Liriops
            '/images/plants/nursery-1.jpeg',  # Little Gem
            '/images/plants/nursery-1.jpeg',  # Little John
            '/images/plants/nursery-1.jpeg',  # Little Ollie
            '/images/plants/nursery-1.jpeg',  # Little Rev
            '/images/plants/nursery-1.jpeg',  # Lodge Pole
            '/images/plants/nursery-1.jpeg',  # Lodge Pole
            '/images/plants/nursery-1.jpeg',  # Lodge Pole
            '/images/plants/nursery-1.jpeg',  # Lomandrea Breeze
            '/images/plants/nursery-1.jpeg',  # Loquat
            '/images/plants/nursery-1.jpeg',  # Loquat
            '/images/plants/nursery-1.jpeg',  # Loquat
            '/images/plants/nursery-1.jpeg',  # Lorapetulm
            '/images/plants/nursery-1.jpeg',  # Lowquat
            '/images/plants/nursery-1.jpeg',  # Macadamia Nut
            '/images/plants/nursery-1.jpeg',  # Macadamian Nut
            '/images/plants/nursery-1.jpeg',  # Macadamian Nut
            '/images/plants/nursery-1.jpeg',  # Magnolia Little Gem
            '/images/plants/nursery-1.jpeg',  # Mandevilla
            '/images/plants/nursery-1.jpeg',  # Mango
            '/images/plants/nursery-1.jpeg',  # Mango
            '/images/plants/nursery-1.jpeg',  # Manzanita
            '/images/plants/nursery-1.jpeg',  # Margarete Daisey
            '/images/plants/nursery-1.jpeg',  # Masquite
            '/images/plants/nursery-1.jpeg',  # Matilia Poppy
            '/images/plants/nursery-1.jpeg',  # Medditeranean Fan Palm
            '/images/plants/nursery-1.jpeg',  # Medditeranean Fan Palm
            '/images/plants/nursery-1.jpeg',  # Mesquite
            '/images/plants/nursery-1.jpeg',  # Mexican Bird of Paradise
            '/images/plants/nursery-1.jpeg',  # Mexican Feather Grass
            '/images/plants/nursery-1.jpeg',  # Mexican Grass Palm
            '/images/plants/nursery-1.jpeg',  # Mexican Grass Palm
            '/images/plants/nursery-1.jpeg',  # Mexican Lime
            '/images/plants/nursery-1.jpeg',  # Mexican Marigold
            '/images/plants/nursery-1.jpeg',  # Mexican Sage
            '/images/plants/nursery-1.jpeg',  # Meyer Lemon
            '/images/plants/nursery-1.jpeg',  # Milk Weed
            '/images/plants/nursery-1.jpeg',  # Miniature ivy
            '/images/plants/nursery-1.jpeg',  # Morning Glory Stk.
            '/images/plants/nursery-1.jpeg',  # Morrea Iris
            '/images/plants/nursery-1.jpeg',  # Mulberry
            '/images/plants/nursery-1.jpeg',  # Mulberry Fruit
            '/images/plants/nursery-1.jpeg',  # Mulberry Fruitless
            '/images/plants/nursery-1.jpeg',  # Nandina Harbor Dwf
            '/images/plants/nursery-1.jpeg',  # Nandina Nana
            '/images/plants/nursery-1.jpeg',  # Native Daisey
            '/images/plants/nursery-1.jpeg',  # Nectarine
            '/images/plants/nursery-1.jpeg',  # Oak
            '/images/plants/nursery-1.jpeg',  # Oak Tree
            '/images/plants/nursery-1.jpeg',  # Oak Tree
            '/images/plants/nursery-1.jpeg',  # Ocotillo
            '/images/plants/nursery-1.jpeg',  # Octapuse Agave
            '/images/plants/nursery-1.jpeg',  # Oleander
            '/images/plants/nursery-1.jpeg',  # Olive Fruitless
            '/images/plants/nursery-1.jpeg',  # Olive Topiary
            '/images/plants/nursery-1.jpeg',  # Orange
            '/images/plants/nursery-1.jpeg',  # Orange
            '/images/plants/nursery-1.jpeg',  # Palo Verde
            '/images/plants/nursery-1.jpeg',  # Palo Verde
            '/images/plants/nursery-1.jpeg',  # Palos Verde
            '/images/plants/nursery-1.jpeg',  # Palos Verde
            '/images/plants/nursery-1.jpeg',  # Passion Fruit
            '/images/plants/nursery-1.jpeg',  # Peach
            '/images/plants/nursery-1.jpeg',  # Pear
            '/images/plants/nursery-1.jpeg',  # Penstemon Hoothill
            '/images/plants/nursery-1.jpeg',  # Periwinkle
            '/images/plants/nursery-1.jpeg',  # Persimmion
            '/images/plants/nursery-1.jpeg',  # Persimon
            '/images/plants/nursery-1.jpeg',  # Photenia
            '/images/plants/nursery-1.jpeg',  # Photenia
            '/images/plants/nursery-1.jpeg',  # Pindo Palm
            '/images/plants/nursery-1.jpeg',  # Pindo Palm
            '/images/plants/nursery-1.jpeg',  # Pineapple Guava
            '/images/plants/nursery-1.jpeg',  # Pink Dwarf Oleander
            '/images/plants/nursery-1.jpeg',  # Pink Jasmine
            '/images/plants/nursery-1.jpeg',  # Pink Mulley
            '/images/plants/nursery-1.jpeg',  # Pistachio
            '/images/plants/nursery-1.jpeg',  # Pittosporum
            '/images/plants/nursery-1.jpeg',  # Plum
            '/images/plants/nursery-1.jpeg',  # Plumbego
            '/images/plants/nursery-1.jpeg',  # Pluot
            '/images/plants/nursery-1.jpeg',  # Podocarpus
            '/images/plants/nursery-1.jpeg',  # Pomaris  Grass
            '/images/plants/nursery-1.jpeg',  # Pomegranate
            '/images/plants/nursery-1.jpeg',  # Pony Tail Palms
            '/images/plants/nursery-1.jpeg',  # Privet
            '/images/plants/nursery-1.jpeg',  # Privet
            '/images/plants/nursery-1.jpeg',  # Privet
            '/images/plants/nursery-1.jpeg',  # Procumbana Juniper
            '/images/plants/nursery-1.jpeg',  # Purple Heart
            '/images/plants/nursery-1.jpeg',  # Purple Leaf Plum
            '/images/plants/nursery-1.jpeg',  # Pygmy Palm
            '/images/plants/nursery-1.jpeg',  # Pyrocanthus
            '/images/plants/nursery-1.jpeg',  # Queen Palm
            '/images/plants/nursery-1.jpeg',  # Queen Palms
            '/images/plants/nursery-1.jpeg',  # Queen Palms
            '/images/plants/nursery-1.jpeg',  # Queen Palms
            '/images/plants/nursery-1.jpeg',  # Queen Palm
            '/images/plants/nursery-1.jpeg',  # Rainbow Flax
            '/images/plants/nursery-1.jpeg',  # Red Banana
            '/images/plants/nursery-1.jpeg',  # Red Bud
            '/images/plants/nursery-1.jpeg',  # Red Bud
            '/images/plants/nursery-1.jpeg',  # Red Hot Poker
            '/images/plants/nursery-1.jpeg',  # Red Tip Photenia
            '/images/plants/nursery-1.jpeg',  # Red Yucca
            '/images/plants/nursery-1.jpeg',  # Regular Pony Pack
            '/images/plants/nursery-1.jpeg',  # Rhaphs
            '/images/plants/nursery-1.jpeg',  # Rock Rose
            '/images/plants/nursery-1.jpeg',  # Rose Bush
            '/images/plants/nursery-1.jpeg',  # Rose Tree
            '/images/plants/nursery-1.jpeg',  # Ruelle Dwf Purple
            '/images/plants/nursery-1.jpeg',  # Rosemary
            '/images/plants/nursery-1.jpeg',  # Russian Sage
            '/images/plants/nursery-1.jpeg',  # Sage
            '/images/plants/nursery-1.jpeg',  # Sago
            '/images/plants/nursery-1.jpeg',  # Sago Palm
            '/images/plants/nursery-1.jpeg',  # Sago Palm
            '/images/plants/nursery-1.jpeg',  # Sago Palm
            '/images/plants/nursery-1.jpeg',  # Sago Palm
            '/images/plants/nursery-1.jpeg',  # Sago Palm
            '/images/plants/nursery-1.jpeg',  # Salvia Greggii
            '/images/plants/nursery-1.jpeg',  # Santa Barbara Daisy
            '/images/plants/nursery-1.jpeg',  # Sapote
            '/images/plants/nursery-1.jpeg',  # Sapote
            '/images/plants/nursery-1.jpeg',  # Sea Lavender
            '/images/plants/nursery-1.jpeg',  # Sea Side Daisy
            '/images/plants/nursery-1.jpeg',  # Sego
            '/images/plants/nursery-1.jpeg',  # Sego Palm
            '/images/plants/nursery-1.jpeg',  # Sego Palm
            '/images/plants/nursery-1.jpeg',  # Shade
            '/images/plants/nursery-1.jpeg',  # Shade Tree
            '/images/plants/nursery-1.jpeg',  # Shade Tree
            '/images/plants/nursery-1.jpeg',  # Shade Tree
            '/images/plants/nursery-1.jpeg',  # Shade Tree
            '/images/plants/nursery-1.jpeg',  # Shade Tree
            '/images/plants/nursery-1.jpeg',  # Shade Tree
            '/images/plants/nursery-1.jpeg',  # Shade Tree
            '/images/plants/nursery-1.jpeg',  # Shade Tree
            '/images/plants/nursery-1.jpeg',  # Shade Tree
            '/images/plants/nursery-1.jpeg',  # Shade Tree
            '/images/plants/nursery-1.jpeg',  # Shade Tree
            '/images/plants/nursery-1.jpeg',  # Shade Tree
            '/images/plants/nursery-1.jpeg',  # Shade Tree
            '/images/plants/nursery-1.jpeg',  # Shade Tree
            '/images/plants/nursery-1.jpeg',  # Shade Tree
            '/images/plants/nursery-1.jpeg',  # Shade Tree
            '/images/plants/nursery-1.jpeg',  # Shade Tree
            '/images/plants/nursery-1.jpeg',  # Shade Tree
            '/images/plants/nursery-1.jpeg',  # Shade Tree
            '/images/plants/nursery-1.jpeg',  # Shipping
            '/images/plants/nursery-1.jpeg',  # Shipping & Handling
            '/images/plants/nursery-1.jpeg',  # Shipping & Handling
            '/images/plants/nursery-1.jpeg',  # Shipping & Handling
            '/images/plants/nursery-1.jpeg',  # Shipping and Handling
            '/images/plants/nursery-1.jpeg',  # Shrimp Plant
            '/images/plants/nursery-1.jpeg',  # Silk Floss Tree
            '/images/plants/nursery-1.jpeg',  # Society Garlic
            '/images/plants/nursery-1.jpeg',  # Soil Big Harvest
            '/images/plants/nursery-1.jpeg',  # Soil Cactus
            '/images/plants/nursery-1.jpeg',  # Spiral Juniper
            '/images/plants/nursery-1.jpeg',  # split leaf
            '/images/plants/nursery-1.jpeg',  # Staked Bougainvillea
            '/images/plants/nursery-1.jpeg',  # Stakes 8'
            '/images/plants/nursery-1.jpeg',  # Standard Bird of Paradise
            '/images/plants/nursery-1.jpeg',  # Standard Bird of Paradise
            '/images/plants/nursery-1.jpeg',  # Star Jasmine Staked Vine
            '/images/plants/nursery-1.jpeg',  # Star Jasmine Staked Vine
            '/images/plants/nursery-1.jpeg',  # Statice
            '/images/plants/nursery-1.jpeg',  # Sticks on Fire
            '/images/plants/nursery-1.jpeg',  # Succulant 4"
            '/images/plants/nursery-1.jpeg',  # Succulant 6"
            '/images/plants/nursery-1.jpeg',  # Sun Patience
            '/images/plants/nursery-1.jpeg',  # Super Thrive
            '/images/plants/nursery-1.jpeg',  # Super Thrive
            '/images/plants/nursery-1.jpeg',  # Sweet Pea
            '/images/plants/nursery-1.jpeg',  # Tangerine
            '/images/plants/nursery-1.jpeg',  # Tangerine
            '/images/plants/nursery-1.jpeg',  # Tecoma Bells
            '/images/plants/nursery-1.jpeg',  # Texas Privet
            '/images/plants/nursery-1.jpeg',  # Texas Ranger
            '/images/plants/nursery-1.jpeg',  # Texas Ranger
            '/images/plants/nursery-1.jpeg',  # Toothless Sotol
            '/images/plants/nursery-1.jpeg',  # Torch Glow Bougaainvillea
            '/images/plants/nursery-1.jpeg',  # Trumpet Vine
            '/images/plants/nursery-1.jpeg',  # Valencia Orange
            '/images/plants/nursery-1.jpeg',  # Variegated Pink Lemon
            '/images/plants/nursery-1.jpeg',  # Varigated Dianella
            '/images/plants/nursery-1.jpeg',  # Vegetable Quart
            '/images/plants/nursery-1.jpeg',  # Vegetable 5 Gallon
            '/images/plants/nursery-1.jpeg',  # Vegetable Pony
            '/images/plants/nursery-1.jpeg',  # Verg Oleander
            '/images/plants/nursery-1.jpeg',  # Veronica
            '/images/plants/nursery-1.jpeg',  # Vine
            '/images/plants/nursery-1.jpeg',  # Vine
            '/images/plants/nursery-1.jpeg',  # Vine
            '/images/plants/nursery-1.jpeg',  # Walnut
            '/images/plants/nursery-1.jpeg',  # Washington Navel Orange
            '/images/plants/nursery-1.jpeg',  # White Birch
            '/images/plants/nursery-1.jpeg',  # White Rock Rose
            '/images/plants/nursery-1.jpeg',  # White Sage
            '/images/plants/nursery-1.jpeg',  # Wild Petunia
            '/images/plants/nursery-1.jpeg',  # Wisteria
            '/images/plants/nursery-1.jpeg',  # Zebra Grass
            '/images/plants/nursery-1.jpeg',  # Yellow Yucca
            '/images/plants/nursery-1.jpeg',  # Yellow Wave Flax
            '/images/plants/nursery-1.jpeg',  # Yellow Wave Flax
            '/images/plants/nursery-1.jpeg',  # Yellow Bells
            '/images/plants/nursery-1.jpeg',  # Yarrow
            '/images/plants/nursery-1.jpeg',  # Woodchips
            '/images/plants/nursery-1.jpeg',  # Wistrengia
            '/images/plants/nursery-1.jpeg',  # White Sage
            '/images/plants/nursery-1.jpeg',  # Cutrenella 5 G
            '/images/plants/nursery-1.jpeg',  # Citronella 5gallon
            '/images/plants/nursery-1.jpeg',  # Arborvitae
            '/images/plants/nursery-1.jpeg',  # Rose Of Sharron
            '/images/plants/nursery-1.jpeg',  # Spiral Juniper. 5 Gallon
            '/images/plants/nursery-1.jpeg',  # Spiral Juniper 15 Gallon
            '/images/plants/nursery-1.jpeg',  # 3 Tier Poodle Privet
            '/images/plants/nursery-1.jpeg',  # Blue Point Spiral 16" Pot
            '/images/plants/nursery-1.jpeg',  # Patio Tree Privet 16"
            '/images/plants/nursery-1.jpeg',  # Bush
            '/images/plants/nursery-1.jpeg',  # Blue Point 2 Tier
            '/images/plants/nursery-1.jpeg',  # Fertilizer
            '/images/plants/nursery-1.jpeg',  # Empty 24"
            '/images/plants/nursery-1.jpeg',  # Myoporum
            '/images/plants/nursery-1.jpeg',  # Cherry
            '/images/plants/nursery-1.jpeg',  # Foxtail Fern
            '/images/plants/nursery-1.jpeg',  # Stake 8'
            '/images/plants/nursery-1.jpeg',  # Shipping & Handling
            '/images/plants/nursery-1.jpeg',  # Plumeria 1 Gallon
            '/images/plants/nursery-1.jpeg',  # Split Leaf Philodendron 5 Gallon
            '/images/plants/nursery-1.jpeg',  # Bamboo
            '/images/plants/nursery-1.jpeg',  # Rose Bush
            '/images/plants/nursery-1.jpeg',  # Tree Hibisxus
            '/images/plants/nursery-1.jpeg',  # Corn Plant
            '/images/plants/nursery-1.jpeg',  # Pongtail Palm 14"
            '/images/plants/nursery-1.jpeg',  # Pygmy Palm 10"
            '/images/plants/nursery-1.jpeg',  # Riv Coynty
            '/images/plants/nursery-1.jpeg',  # Emlty 25 Gal
            '/images/plants/nursery-1.jpeg',  # Empty 25 Gal
            '/images/plants/nursery-1.jpeg',  # Soil Steer Manure 2CF
            '/images/plants/nursery-1.jpeg',  # Strawberry Tree
            '/images/plants/nursery-1.jpeg',  # Arbutus Marina
            '/images/plants/nursery-1.jpeg',  # Soil Organic Potting
            '/images/plants/nursery-1.jpeg',  # Soil Chicken Manure
            '/images/plants/nursery-1.jpeg',  # Desert Willow
            '/images/plants/nursery-1.jpeg',  # Fruitless olive
            '/images/plants/nursery-1.jpeg',  # Bottle brush tree
            '/images/plants/nursery-1.jpeg',  # Shipping And Handling
            '/images/plants/nursery-1.jpeg',  # King Palm
            '/images/plants/nursery-1.jpeg',  # Magnolia Grandiflora
            '/images/plants/nursery-1.jpeg',  # Pink Crape Myrtle
            '/images/plants/nursery-1.jpeg',  # Terra Cotta. Pots
            '/images/plants/nursery-1.jpeg',  # Euryops
            '/images/plants/nursery-1.jpeg',  # Grass
            '/images/plants/nursery-1.jpeg',  # Juniper 15 Gallon
            '/images/plants/nursery-1.jpeg',  # Pink Powder Puff
            '/images/plants/nursery-1.jpeg',  # 4in succulent
            '/images/plants/nursery-1.jpeg',  # Empty 1 Gallon
            '/images/plants/nursery-1.jpeg',  # pepper tree
            '/images/plants/nursery-1.jpeg',  # kiwi
            '/images/plants/nursery-1.jpeg',  # olive tree
            '/images/plants/nursery-1.jpeg',  # Bag Fertelizer
            '/images/plants/nursery-1.jpeg',  # Citranella
            '/images/plants/nursery-1.jpeg',  # podocarpus
            '/images/plants/nursery-1.jpeg',  # trellis LG
            '/images/plants/nursery-1.jpeg',  # pomegranate
            '/images/plants/nursery-1.jpeg',  # Desert Spoon 25g
            '/images/plants/nursery-1.jpeg',  # Ocotillo
            '/images/plants/nursery-1.jpeg',  # Jade
            '/images/plants/nursery-1.jpeg',  # Mandevilla 1 Gallon
            '/images/plants/nursery-1.jpeg',  # Passion Fruit Trellis
            '/images/plants/nursery-1.jpeg',  # crape mytle
            '/images/plants/nursery-1.jpeg',  # small trelice
            '/images/plants/nursery-1.jpeg',  # Ratch-it
            '/images/plants/nursery-1.jpeg',  # King Palm
            '/images/plants/nursery-1.jpeg',  # 4in color
            '/images/plants/nursery-1.jpeg',  # Annual Single
            '/images/plants/nursery-1.jpeg',  # Flax 1g
            '/images/plants/nursery-1.jpeg',  # Firecracker 1g
            '/images/plants/nursery-1.jpeg',  # Manzanita 1 G
            '/images/plants/nursery-1.jpeg',  # Cyclamen Flat
            '/images/plants/nursery-1.jpeg',  # Fruitless Olive
            '/images/plants/nursery-1.jpeg',  # tape
            '/images/plants/nursery-1.jpeg',  # Aloe Moonglow
            '/images/plants/nursery-1.jpeg',  # Cypress Dwf
            '/images/plants/nursery-1.jpeg',  # Coral Aloe
            '/images/plants/nursery-1.jpeg',  # Fruitless Olive 24"
            '/images/plants/nursery-1.jpeg',  # Aloe Little Gem
            '/images/plants/nursery-1.jpeg',  # Abelia
            '/images/plants/nursery-1.jpeg',  # Fruit Tree 25 Gal
            '/images/plants/nursery-1.jpeg',  # Arbutu Marina 24"
            '/images/plants/nursery-1.jpeg',  # Hibiscus 15 G
            '/images/plants/nursery-1.jpeg',  # Rose Of Sharron
            '/images/plants/nursery-1.jpeg',  # Orange Bell
            '/images/plants/nursery-1.jpeg',  # Pineapple Guave
            '/images/plants/nursery-1.jpeg',  # Sego
            '/images/plants/nursery-1.jpeg',  # Crape Myrtle
            '/images/plants/nursery-1.jpeg',  # Blue Point Juniper
            '/images/plants/nursery-1.jpeg',  # Sego Palm 15 Gallon
            '/images/plants/nursery-1.jpeg',  # Coffee Berry
            '/images/plants/nursery-1.jpeg',  # Avocado Tree
            '/images/plants/nursery-1.jpeg',  # euryopes
            '/images/plants/nursery-1.jpeg',  # blue chalckstick
            '/images/plants/nursery-1.jpeg',  # olive
            '/images/plants/nursery-1.jpeg',  # Color Flat
            '/images/plants/nursery-1.jpeg',  # Weed Barrier 15' Roll
            '/images/plants/nursery-1.jpeg',  # Weed Barrier 10' Roll
            '/images/plants/nursery-1.jpeg',  # Weed Barrier 6' Roll
            '/images/plants/nursery-1.jpeg',  # Weed Barrier 6' Per Foot
            '/images/plants/nursery-1.jpeg',  # Weed Barrier 10' Per Foot
            '/images/plants/nursery-1.jpeg',  # Weed Barrier 15' Per Foot
            '/images/plants/nursery-1.jpeg',  # Staples Bag
            '/images/plants/nursery-1.jpeg',  # fruitless olive
            '/images/plants/nursery-1.jpeg',  # pride of madera
            '/images/plants/nursery-1.jpeg',  # Hybrid Verbena
            '/images/plants/nursery-1.jpeg',  # Mexican sage
            '/images/plants/nursery-1.jpeg',  # cistus salvifolus
            '/images/plants/nursery-1.jpeg',  # poodle ball juniper
            '/images/plants/nursery-1.jpeg',  # Indian Hawthorne
            '/images/plants/nursery-1.jpeg',  # Carolina Cherry
            '/images/plants/nursery-1.jpeg',  # collard green
            '/images/plants/nursery-1.jpeg',  # hibiscus tree
            '/images/plants/nursery-1.jpeg',  # Red Banana 1 Gallon
            '/images/plants/nursery-1.jpeg',  # Azalea
            '/images/plants/nursery-1.jpeg',  # pink guava
            '/images/plants/nursery-1.jpeg',  # Golden Euonymus
            '/images/plants/nursery-1.jpeg',  # Iceberg Roses
            '/images/plants/nursery-1.jpeg',  # Ground Cover Rose
            '/images/plants/nursery-1.jpeg',  # Rock Rose
            '/images/plants/nursery-1.jpeg',  # Rose of Sharron
            '/images/plants/nursery-1.jpeg',  # Rosemary
            '/images/plants/nursery-1.jpeg',  # White Rockrose
            '/images/plants/nursery-1.jpeg',  # Abelia Kaleidoscope
            '/images/plants/nursery-1.jpeg',  # Agapanthus
            '/images/plants/nursery-1.jpeg',  # Agave Americana
            '/images/plants/nursery-1.jpeg',  # Agave Attenuata
            '/images/plants/nursery-1.jpeg',  # Agave Variegata
            '/images/plants/nursery-1.jpeg',  # Aleppo Pine
            '/images/plants/nursery-1.jpeg',  # Almond
            '/images/plants/nursery-1.jpeg',  # Australian Tea Bush
            '/images/plants/nursery-1.jpeg',  # Blue Fescue
            '/images/plants/nursery-1.jpeg',  # Blue Grass
            '/images/plants/nursery-1.jpeg',  # Bougainvillea Bush
            '/images/plants/nursery-1.jpeg',  # Breath Of Heaven
            '/images/plants/nursery-1.jpeg',  # Bush
            '/images/plants/nursery-1.jpeg',  # Bush 5gallon
            '/images/plants/nursery-1.jpeg',  # Butterfly Bush
            '/images/plants/nursery-1.jpeg',  # California Pepper
            '/images/plants/nursery-1.jpeg',  # Cape Honeysuckle
            '/images/plants/nursery-1.jpeg',  # Carex
            '/images/plants/nursery-1.jpeg',  # Canna Lily
            '/images/plants/nursery-1.jpeg',  # Cassia
            '/images/plants/nursery-1.jpeg',  # Snake Plant
            '/images/plants/nursery-1.jpeg',  # staked bougainvillea
            '/images/plants/nursery-1.jpeg',  # Tree Rose 24"
            '/images/plants/nursery-1.jpeg',  # Tree Rose 36"
            '/images/plants/nursery-1.jpeg',  # agave furccraea macdougallii
            '/images/plants/nursery-1.jpeg',  # mango
            '/images/plants/nursery-1.jpeg',  # pot
            '/images/plants/nursery-1.jpeg',  # Eucalyptus 1 Gallon
            '/images/plants/nursery-1.jpeg',  # potato tree
            '/images/plants/nursery-1.jpeg',  # fruitless mulberry
            '/images/plants/nursery-1.jpeg',  # butterfly bush
            '/images/plants/nursery-1.jpeg',  # rose bush
            '/images/plants/nursery-1.jpeg',  # Dianelle
            '/images/plants/nursery-1.jpeg',  # Cordyline
            '/images/plants/nursery-1.jpeg',  # privet
            '/images/plants/nursery-1.jpeg',  # delivery
            '/images/plants/nursery-1.jpeg',  # geranium mosquito
            '/images/plants/nursery-1.jpeg',  # persimmon
            '/images/plants/nursery-1.jpeg',  # little john
            '/images/plants/nursery-1.jpeg',  # Vege
            '/images/plants/nursery-1.jpeg',  # Quarts
            '/images/plants/nursery-1.jpeg',  # Kangaroo Paw
            '/images/plants/nursery-1.jpeg',  # artemesia
            '/images/plants/nursery-1.jpeg',  # Avocado Tree
            '/images/plants/nursery-1.jpeg',  # red banana
            '/images/plants/nursery-1.jpeg',  # Plumeria 15 Gallon
            '/images/plants/nursery-1.jpeg',  # Plumeria 5 Gallon
            '/images/plants/nursery-1.jpeg',  # Stakes 6'
            '/images/plants/nursery-1.jpeg',  # Stakes 5'
            '/images/plants/nursery-1.jpeg',  # persimmon
            '/images/plants/nursery-1.jpeg',  # bush jasmine
            '/images/plants/nursery-1.jpeg',  # staked jasmine
            '/images/plants/nursery-1.jpeg',  # bush jasmine
            '/images/plants/nursery-1.jpeg',  # tree rose
            '/images/plants/nursery-1.jpeg',  # persimmon
            '/images/plants/nursery-1.jpeg',  # fox tail fern
            '/images/plants/nursery-1.jpeg',  # Texas Privet
            '/images/plants/nursery-1.jpeg',  # sword fern
            '/images/plants/nursery-1.jpeg',  # Afghan Pine
            '/images/plants/nursery-1.jpeg',  # Afterglow Eceveria
            '/images/plants/nursery-1.jpeg',  # Agapanthus Tinker Bell
            '/images/plants/nursery-1.jpeg',  # Algerian Mandarin
            '/images/plants/nursery-1.jpeg',  # Aulstralian Willow 15 Gallon
            '/images/plants/nursery-1.jpeg',  # Aulstralian Willow 24" Box
            '/images/plants/nursery-1.jpeg',  # Autumn Sage
            '/images/plants/nursery-1.jpeg',  # Bears Lime
            '/images/plants/nursery-1.jpeg',  # Bears Lime
            '/images/plants/nursery-1.jpeg',  # Birch
            '/images/plants/nursery-1.jpeg',  # Bird Of Paradise
            '/images/plants/nursery-1.jpeg',  # Bird Of Paradise 15 Gallon
            '/images/plants/nursery-1.jpeg',  # Blood Orange
            '/images/plants/nursery-1.jpeg',  # Blood Orange
            '/images/plants/nursery-1.jpeg',  # Blue Fan Palm
            '/images/plants/nursery-1.jpeg',  # Blue Flame Agave 5 Gallon
            '/images/plants/nursery-1.jpeg',  # Bougainvellea Staked
            '/images/plants/nursery-1.jpeg',  # Bouganvillea Staked
            '/images/plants/nursery-1.jpeg',  # Bower vine
            '/images/plants/nursery-1.jpeg',  # Breaklight Yucca
            '/images/plants/nursery-1.jpeg',  # Breath Of Heaven
            '/images/plants/nursery-1.jpeg',  # Butterfly Bush
            '/images/plants/nursery-1.jpeg',  # Calla Lily
            '/images/plants/nursery-1.jpeg',  # Calomindian
            '/images/plants/nursery-1.jpeg',  # Carissa Green Carpet
            '/images/plants/nursery-1.jpeg',  # Carrotwood
            '/images/plants/nursery-1.jpeg',  # Ceonothus
            '/images/plants/nursery-1.jpeg',  # Ceonothus
            '/images/plants/nursery-1.jpeg',  # Cherimoya
            '/images/plants/nursery-1.jpeg',  # Chinese Flame
            '/images/plants/nursery-1.jpeg',  # Chinese Fringe
            '/images/plants/nursery-1.jpeg',  # Citrus
            '/images/plants/nursery-1.jpeg',  # Clevandi Sage
            '/images/plants/nursery-1.jpeg',  # Cleveland Sage
            '/images/plants/nursery-1.jpeg',  # lavender
            '/images/plants/nursery-1.jpeg',  # honey
            '/images/plants/nursery-1.jpeg',  # Japanese Maple
            '/images/plants/nursery-1.jpeg',  # hydrangea
            '/images/plants/nursery-1.jpeg',  # passion fruit
            '/images/plants/nursery-1.jpeg',  # lodge poles
            '/images/plants/nursery-1.jpeg',  # Guava
            '/images/plants/nursery-1.jpeg',  # pink rhaphiolepis
            '/images/plants/nursery-1.jpeg',  # ceanthus
            '/images/plants/nursery-1.jpeg',  # fountain grass
            '/images/plants/nursery-1.jpeg',  # Iceberg White
            '/images/plants/nursery-1.jpeg',  # Iceberg Pink
            '/images/plants/nursery-1.jpeg',  # Iceberb Burgandy
            '/images/plants/nursery-1.jpeg',  # magnolia
            '/images/plants/nursery-1.jpeg',  # Golden Rain
            '/images/plants/nursery-1.jpeg',  # Rhaphiolepis
            '/images/plants/nursery-1.jpeg',  # Society Garlic
            '/images/plants/nursery-1.jpeg',  # Soil Rose
            '/images/plants/nursery-1.jpeg',  # Creeping Fig
            '/images/plants/nursery-1.jpeg',  # Creme De Mint
            '/images/plants/nursery-1.jpeg',  # Daisy
            '/images/plants/nursery-1.jpeg',  # Darantha
            '/images/plants/nursery-1.jpeg',  # Deer Grass
            '/images/plants/nursery-1.jpeg',  # Avocado Tree
            '/images/plants/nursery-1.jpeg',  # African Sumac
            '/images/plants/nursery-1.jpeg',  # Banana
            '/images/plants/nursery-1.jpeg',  # Barberry
            '/images/plants/nursery-1.jpeg',  # Barrel Cactus 5 G
            '/images/plants/nursery-1.jpeg',  # 5 Gal Empty
            '/images/plants/nursery-1.jpeg',  # Afghan Pine
            '/images/plants/nursery-1.jpeg',  # Abelia 1 G
            '/images/plants/nursery-1.jpeg',  # Acacia Low Boy 1 G
            '/images/plants/nursery-1.jpeg',  # Iceberg Rose 15 G
            '/images/plants/nursery-1.jpeg',  # African Sumac 24"
            '/images/plants/nursery-1.jpeg',  # African Sumac 5G
            '/images/plants/nursery-1.jpeg',  # Acaci Low Boy 5G
            '/images/plants/nursery-1.jpeg',  # Abelia 5G
            '/images/plants/nursery-1.jpeg',  # Berries
            '/images/plants/nursery-1.jpeg',  # Blueberry
            '/images/plants/nursery-1.jpeg',  # Blackberry
            '/images/plants/nursery-1.jpeg',  # Dwf Mock Orange
            '/images/plants/nursery-1.jpeg',  # Barrel Cactus
            '/images/plants/nursery-1.jpeg',  # Fire Sticks
            '/images/plants/nursery-1.jpeg',  # Fig
            '/images/plants/nursery-1.jpeg',  # Fruitless Olive Dwarf
            '/images/plants/nursery-1.jpeg',  # Escalonia
            '/images/plants/nursery-1.jpeg',  # Flax
            '/images/plants/nursery-1.jpeg',  # Fountain Grass
            '/images/plants/nursery-1.jpeg',  # Foxtail Fern
            '/images/plants/nursery-1.jpeg',  # Foxtail Aloe
            '/images/plants/nursery-1.jpeg',  # Guara
            '/images/plants/nursery-1.jpeg',  # Germander
            '/images/plants/nursery-1.jpeg',  # Golden Breath of Heaven
            '/images/plants/nursery-1.jpeg',  # Halls Honeysuckle
            '/images/plants/nursery-1.jpeg',  # Hesperole
            '/images/plants/nursery-1.jpeg',  # Holly
            '/images/plants/nursery-1.jpeg',  # Hopseed
            '/images/plants/nursery-1.jpeg',  # Horsetail
            '/images/plants/nursery-1.jpeg',  # Jerusalem Sage
            '/images/plants/nursery-1.jpeg',  # Juniper
            '/images/plants/nursery-1.jpeg',  # Kangaroo Paw
            '/images/plants/nursery-1.jpeg',  # Lantana
            '/images/plants/nursery-1.jpeg',  # Marguerite Daisy
            '/images/plants/nursery-1.jpeg',  # Mediterranean Fan Palm
            '/images/plants/nursery-1.jpeg',  # Mytrle Compacta
            '/images/plants/nursery-1.jpeg',  # Myrtus Compacta
            '/images/plants/nursery-1.jpeg',  # Mexican Feather Grass
            '/images/plants/nursery-1.jpeg',  # Morea Iris Lily
            '/images/plants/nursery-1.jpeg',  # Nandina Domestica
            '/images/plants/nursery-1.jpeg',  # Nandina Nana
            '/images/plants/nursery-1.jpeg',  # Natal Plum
            '/images/plants/nursery-1.jpeg',  # Oleander
            '/images/plants/nursery-1.jpeg',  # Orange Bell
            '/images/plants/nursery-1.jpeg',  # Paddle Cactus
            '/images/plants/nursery-1.jpeg',  # Parrots Beak
            '/images/plants/nursery-1.jpeg',  # Pink Lady
            '/images/plants/nursery-1.jpeg',  # Pittosporum
            '/images/plants/nursery-1.jpeg',  # Pittosporum Dwarf
            '/images/plants/nursery-1.jpeg',  # Plumbego
            '/images/plants/nursery-1.jpeg',  # Pyrocanthis
            '/images/plants/nursery-1.jpeg',  # Red Flax
            '/images/plants/nursery-1.jpeg',  # Red Yucca
            '/images/plants/nursery-1.jpeg',  # Red Fountain Grass
            '/images/plants/nursery-1.jpeg',  # Red Hot Pocker
            '/images/plants/nursery-1.jpeg',  # Red Tip Photenia
            '/images/plants/nursery-1.jpeg',  # Ruella
            '/images/plants/nursery-1.jpeg',  # Russian Sage
            '/images/plants/nursery-1.jpeg',  # Salvia
            '/images/plants/nursery-1.jpeg',  # Salvia Gregii
            '/images/plants/nursery-1.jpeg',  # Santan Barbara Daisy
            '/images/plants/nursery-1.jpeg',  # Scoop of Soil
            '/images/plants/nursery-1.jpeg',  # Sea Pink Armeria
            '/images/plants/nursery-1.jpeg',  # Silver Carpet
            '/images/plants/nursery-1.jpeg',  # Hibiscus
            '/images/plants/nursery-1.jpeg',  # Soil 4/20
            '/images/plants/nursery-1.jpeg',  # Soil Booster
            '/images/plants/nursery-1.jpeg',  # Soil Cali Blend
            '/images/plants/nursery-1.jpeg',  # Spanish Lavender
            '/images/plants/nursery-1.jpeg',  # Statice
            '/images/plants/nursery-1.jpeg',  # Sweet Pea
            '/images/plants/nursery-1.jpeg',  # Teucriam
            '/images/plants/nursery-1.jpeg',  # Texas Ranger
            '/images/plants/nursery-1.jpeg',  # Toyon
            '/images/plants/nursery-1.jpeg',  # Valencia Orange
            '/images/plants/nursery-1.jpeg',  # Variegated Pink Lemon
            '/images/plants/nursery-1.jpeg',  # Vitex
            '/images/plants/nursery-1.jpeg',  # Washington Navel Orange
            '/images/plants/nursery-1.jpeg',  # Wisteria Vine
            '/images/plants/nursery-1.jpeg',  # Westrengia
            '/images/plants/nursery-1.jpeg',  # Xylosma
            '/images/plants/nursery-1.jpeg',  # Yarrow
            '/images/plants/nursery-1.jpeg',  # Yellow Bell
            '/images/plants/nursery-1.jpeg',  # milkweed
            '/images/plants/nursery-1.jpeg',  # Milk Weed
            '/images/plants/nursery-1.jpeg',  # Milkweed
            '/images/plants/nursery-1.jpeg',  # juncus
            '/images/plants/nursery-1.jpeg',  # Climbing Rose
            '/images/plants/nursery-1.jpeg',  # 24in empty
            '/images/plants/nursery-1.jpeg',  # Canary Island Palm
            '/images/plants/nursery-1.jpeg',  # Grass Seed
            '/images/plants/nursery-1.jpeg',  # fruit
            '/images/plants/nursery-1.jpeg',  # Fern
            '/images/plants/nursery-1.jpeg',  # Palos Verde
            '/images/plants/nursery-1.jpeg',  # Agave
            '/images/plants/nursery-1.jpeg',  # empty 36" box
            '/images/plants/nursery-1.jpeg',  # barrel cactus
            '/images/plants/nursery-1.jpeg',  # Sea Lavender
            '/images/plants/nursery-1.jpeg',  # collard green
            '/images/plants/nursery-1.jpeg',  # hibiscus
            '/images/plants/nursery-1.jpeg',  # Palo verde
            '/images/plants/nursery-1.jpeg',  # lemon
            '/images/plants/nursery-1.jpeg',  # Custom Item
            '/images/plants/nursery-1.jpeg',  # Howard McMinn 1 Gal
            '/images/plants/nursery-1.jpeg',  # Howard McMinn 5gal
            '/images/plants/nursery-1.jpeg',  # Emerald Carpet 1gal
            '/images/plants/nursery-1.jpeg',  # California Fuscue 1gal
            '/images/plants/nursery-1.jpeg',  # Desert. Mallow 5gal
            '/images/plants/nursery-1.jpeg',  # Desert Mallow 5 Gal
            '/images/plants/nursery-1.jpeg',  # barrel cactus
            '/images/plants/nursery-1.jpeg',  # bougainvillea
            '/images/plants/nursery-1.jpeg',  # ficus
            '/images/plants/nursery-1.jpeg',  # agave blue glow
            '/images/plants/nursery-1.jpeg',  # wheeleri
            '/images/plants/nursery-1.jpeg',  # Bismark Palm. 20 Gal
            '/images/plants/nursery-1.jpeg',  # Mexican Fan Palm
            '/images/plants/nursery-1.jpeg',  # Sego Palm
            '/images/plants/nursery-1.jpeg',  # Bougainville
            '/images/plants/nursery-1.jpeg',  # camphor
            '/images/plants/nursery-1.jpeg',  # Dog Coolar Singal
            '/images/plants/nursery-1.jpeg',  # Dog Collar 3 Pack
            '/images/plants/nursery-1.jpeg',  # Dog Crate
            '/images/plants/nursery-1.jpeg',  # Dog Bed
            '/images/plants/nursery-1.jpeg',  # rubber tree
            '/images/plants/nursery-1.jpeg',  # agave victoria
            '/images/plants/nursery-1.jpeg',  # Agave Desmettiana
            '/images/plants/nursery-1.jpeg',  # Little Ollie
            '/images/plants/nursery-1.jpeg',  # pygmy
            '/images/plants/nursery-1.jpeg',  # sticks on fire
            '/images/plants/nursery-1.jpeg',  # Italian cypress
            '/images/plants/nursery-1.jpeg',  # Dog Toy
            '/images/plants/nursery-1.jpeg',  # persimmon
            '/images/plants/nursery-1.jpeg',  # Moringa
            '/images/plants/nursery-1.jpeg',  # Papaya
            '/images/plants/nursery-1.jpeg',  # Pink Mulhy
            '/images/plants/nursery-1.jpeg',  # Sundrop
            '/images/plants/nursery-1.jpeg',  # Red Salvia
            '/images/plants/nursery-1.jpeg',  # Salvia 1G
            '/images/plants/nursery-1.jpeg',  # Cana Lily
            '/images/plants/nursery-1.jpeg',  # Terra Cotta Pot
            '/images/plants/nursery-1.jpeg',  # Camphor 36''
            '/images/plants/nursery-1.jpeg',  # purple fountain grass
            '/images/plants/nursery-1.jpeg',  # Podacarpus
            '/images/plants/nursery-1.jpeg',  # Pygmy Palm
            '/images/plants/nursery-1.jpeg',  # bush
            '/images/plants/nursery-1.jpeg',  # Mexican Birds
            '/images/plants/nursery-1.jpeg',  # jackaranda
            '/images/plants/nursery-1.jpeg',  # passion flower
            '/images/plants/nursery-1.jpeg',  # Blue Fan Palm
            '/images/plants/nursery-1.jpeg',  # Blue Fan Palm
            '/images/plants/nursery-1.jpeg',  # Hong Kong Orchid
            '/images/plants/nursery-1.jpeg',  # Ponytail Palm
            '/images/plants/nursery-1.jpeg',  # Medditeranean Fan Palm
            '/images/plants/nursery-1.jpeg',  # Red Banana
            '/images/plants/nursery-1.jpeg',  # Mexican Blue Fan Palm
            '/images/plants/nursery-1.jpeg',  # Cyclamen Flat
            '/images/plants/nursery-1.jpeg',  # Chinese Tallow
            '/images/plants/nursery-1.jpeg',  # Acacia
            '/images/plants/nursery-1.jpeg',  # Mesquite
            '/images/plants/nursery-1.jpeg',  # Rubber Straps
            '/images/plants/nursery-1.jpeg',  # Fire Cracker
            '/images/plants/nursery-1.jpeg',  # Christmas Tree
            '/images/plants/nursery-1.jpeg',  # Ground Cover
            '/images/plants/nursery-1.jpeg',  # Japanese Privet
            '/images/plants/nursery-1.jpeg',  # Bougainville
            '/images/plants/nursery-1.jpeg',  # citrrus
            '/images/plants/nursery-1.jpeg',  # Camellia
            '/images/plants/nursery-1.jpeg',  # bird of Paradise
            '/images/plants/nursery-1.jpeg',  # shipping and handling
            '/images/plants/nursery-1.jpeg',  # macadamia
            '/images/plants/nursery-1.jpeg',  # Nandina Fire Power
            '/images/plants/nursery-1.jpeg',  # Shipping
            '/images/plants/nursery-1.jpeg',  # masquites
            '/images/plants/nursery-1.jpeg',  # Little Ollie
            '/images/plants/nursery-1.jpeg',  # Elderica Pine
            '/images/plants/nursery-1.jpeg',  # Shoe string acacia
            '/images/plants/nursery-1.jpeg',  # Blue Palo Varde
            '/images/plants/nursery-1.jpeg',  # Desert Spoon
            '/images/plants/nursery-1.jpeg',  # penstemon
            '/images/plants/nursery-1.jpeg',  # Climbing Rose
            '/images/plants/nursery-1.jpeg',  # Succulent
            '/images/plants/nursery-1.jpeg',  # Coyote Bush
            '/images/plants/nursery-1.jpeg',  # snake plant
            '/images/plants/nursery-1.jpeg',  # elephant ear
            '/images/plants/nursery-1.jpeg',  # Hollywood Juniper
            '/images/plants/nursery-1.jpeg',  # Gardenia
            '/images/plants/nursery-1.jpeg',  # bamboo
            '/images/plants/nursery-1.jpeg',  # fruitless Olive
            '/images/plants/nursery-1.jpeg',  # 36 and soil
            '/images/plants/nursery-1.jpeg',  # Climbing Rose
            '/images/plants/nursery-1.jpeg',  # Purple Leaf Plum
            '/images/plants/nursery-1.jpeg',  # Pink Jasmine
            '/images/plants/nursery-1.jpeg',  # 5 Gallon Natives
            '/images/plants/nursery-1.jpeg',  # Lions Tale
            '/images/plants/nursery-1.jpeg',  # Cyclamen
            '/images/plants/nursery-1.jpeg',  # Pine
            '/images/plants/nursery-1.jpeg',  # Avocado Fruit
            '/images/plants/nursery-1.jpeg',  # Jumbo Queen
            '/images/plants/nursery-1.jpeg',  # Wisteria
            '/images/plants/nursery-1.jpeg',  # Xylosma
            '/images/plants/nursery-1.jpeg',  # Oleander
            '/images/plants/nursery-1.jpeg',  # Citrus
            '/images/plants/nursery-1.jpeg',  # Agave
            '/images/plants/nursery-1.jpeg',  # peppers\pines juan high desert nursery
            '/images/plants/nursery-1.jpeg',  # wisteria
            '/images/plants/nursery-1.jpeg',  # Carrotwood 36"
            '/images/plants/nursery-1.jpeg',  # Sweet Acasia
            '/images/plants/nursery-1.jpeg',  # Strawberry Tree
            '/images/plants/nursery-1.jpeg',  # Raywood Ash
            '/images/plants/nursery-1.jpeg',  # Jacaranda
            '/images/plants/nursery-1.jpeg',  # London Plane
            '/images/plants/nursery-1.jpeg',  # Live Oak
            '/images/plants/nursery-1.jpeg',  # Holly Oak
            '/images/plants/nursery-1.jpeg',  # Water Gum
            '/images/plants/nursery-1.jpeg',  # citrus
            '/images/plants/nursery-1.jpeg',  # Bird of Paradise
            '/images/plants/nursery-1.jpeg',  # Milkweed
        ],
        'red-japanes-maple': [
            '/images/plants/red-japanes-maple-1.jpeg',  # Japanese Maple Red
        ],
    }
    
    # Organize images
    for folder_name, image_paths in image_organization.items():
        folder_path = base_dir / folder_name
        folder_path.mkdir(exist_ok=True)
        
        print(f"Creating folder: {folder_path}")
        
        for image_path in image_paths:
            source_path = Path(f"public{image_path}")
            if source_path.exists():
                # Get filename
                filename = source_path.name
                dest_path = folder_path / filename
                
                # Copy image to organized folder
                shutil.copy2(source_path, dest_path)
                print(f"  Copied: {filename}")
            else:
                print(f"  Missing: {image_path}")
    
    print("Image organization completed!")

if __name__ == "__main__":
    organize_images()
