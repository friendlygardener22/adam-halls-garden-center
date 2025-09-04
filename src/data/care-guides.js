// Comprehensive care guides and growing tips for plants and garden products

export const careGuides = {
  // General Plant Care
  general: {
    watering: {
      title: 'Watering Guidelines',
      tips: [
        'Check soil moisture before watering - stick your finger 1-2 inches into the soil',
        'Water deeply and infrequently rather than shallow and often',
        'Water in the morning to allow leaves to dry before evening',
        'Avoid overhead watering for plants prone to fungal diseases',
        'Use room temperature water for indoor plants',
        'Adjust watering frequency based on season and weather conditions'
      ],
      signs: {
        overwatering: ['Yellow leaves', 'Wilting despite wet soil', 'Root rot', 'Mold on soil surface'],
        underwatering: ['Dry, crispy leaves', 'Wilting', 'Slow growth', 'Leaf drop']
      }
    },
    lighting: {
      title: 'Light Requirements',
      tips: [
        'Full sun: 6+ hours of direct sunlight daily',
        'Partial sun: 4-6 hours of direct or filtered sunlight',
        'Shade: Less than 4 hours of direct sunlight',
        'Rotate indoor plants regularly for even growth',
        'Monitor for signs of too much or too little light',
        'Gradually acclimate plants to new light conditions'
      ],
      signs: {
        tooMuchLight: ['Bleached leaves', 'Brown spots', 'Wilting in afternoon'],
        tooLittleLight: ['Leggy growth', 'Small leaves', 'No flowering', 'Yellow leaves']
      }
    },
    soil: {
      title: 'Soil and Potting',
      tips: [
        'Use well-draining soil for most plants',
        'Test soil pH before planting',
        'Amend soil with organic matter for better structure',
        'Choose appropriate pot size - not too large or small',
        'Ensure pots have drainage holes',
        'Repot when roots become pot-bound'
      ]
    },
    fertilizing: {
      title: 'Fertilizing Guidelines',
      tips: [
        'Fertilize during active growth periods (spring and summer)',
        'Use balanced fertilizer (10-10-10) for most plants',
        'Follow package instructions for application rates',
        'Avoid fertilizing newly planted or stressed plants',
        'Water thoroughly before and after fertilizing',
        'Consider organic options for edible plants'
      ]
    }
  },

  // Seasonal Care
  seasonal: {
    spring: {
      title: 'Spring Garden Care',
      tasks: [
        'Clean up winter debris and dead foliage',
        'Prune dead or damaged branches',
        'Divide and transplant perennials',
        'Start seeds indoors for summer vegetables',
        'Apply slow-release fertilizer',
        'Check for and treat early pest problems',
        'Prepare soil for new plantings'
      ]
    },
    summer: {
      title: 'Summer Garden Maintenance',
      tasks: [
        'Water deeply during dry periods',
        'Deadhead spent flowers to encourage reblooming',
        'Monitor for pests and diseases',
        'Harvest vegetables and herbs regularly',
        'Provide shade for heat-sensitive plants',
        'Mulch to retain moisture and suppress weeds',
        'Fertilize container plants regularly'
      ]
    },
    fall: {
      title: 'Fall Garden Preparation',
      tasks: [
        'Plant spring-blooming bulbs',
        'Divide and transplant perennials',
        'Clean up fallen leaves and debris',
        'Protect tender plants from frost',
        'Apply winter mulch after ground freezes',
        'Store garden tools and equipment',
        'Plan next year\'s garden'
      ]
    },
    winter: {
      title: 'Winter Garden Care',
      tasks: [
        'Protect plants from winter damage',
        'Water evergreens during dry periods',
        'Check stored bulbs and tubers',
        'Plan and order seeds for spring',
        'Maintain indoor plants',
        'Clean and sharpen garden tools',
        'Review garden journal and plan improvements'
      ]
    }
  },

  // Plant-Specific Care
  plants: {
    hydrangea: {
      title: 'Hydrangea Care Guide',
      care: {
        watering: 'Keep soil consistently moist, especially during flowering',
        pruning: 'Prune after flowering, remove dead wood in spring',
        fertilizing: 'Use acid fertilizer for blue flowers, alkaline for pink',
        winter: 'Protect from harsh winter winds, mulch heavily'
      },
      tips: [
        'Flower color depends on soil pH - blue in acidic, pink in alkaline',
        'Don\'t prune in fall - wait until spring',
        'Provide afternoon shade in hot climates',
        'Water deeply 2-3 times per week during growing season'
      ]
    },
    japaneseMaple: {
      title: 'Japanese Maple Care Guide',
      care: {
        watering: 'Deep, infrequent watering, drought tolerant when established',
        pruning: 'Minimal pruning needed, remove dead branches in winter',
        fertilizing: 'Light spring fertilizer, avoid high nitrogen',
        winter: 'Protect from winter sun and wind'
      },
      tips: [
        'Plant in morning sun, afternoon shade',
        'Avoid planting in windy locations',
        'Don\'t over-fertilize - can cause weak growth',
        'Mulch to protect shallow roots'
      ]
    },
    lavender: {
      title: 'Lavender Care Guide',
      care: {
        watering: 'Drought tolerant, avoid overwatering',
        pruning: 'Prune after flowering, shape in spring',
        fertilizing: 'Light spring fertilizer, avoid over-feeding',
        winter: 'Protect from wet winter conditions'
      },
      tips: [
        'Plant in well-draining, alkaline soil',
        'Full sun is essential for good flowering',
        'Don\'t overwater - lavender prefers dry conditions',
        'Harvest flowers for drying when buds are just opening'
      ]
    },
    roses: {
      title: 'Rose Care Guide',
      care: {
        watering: 'Deep watering 2-3 times per week',
        pruning: 'Prune in early spring, remove dead wood',
        fertilizing: 'Regular feeding with rose fertilizer',
        winter: 'Minimal protection needed for most varieties'
      },
      tips: [
        'Plant in full sun with good air circulation',
        'Water at the base, avoid wetting leaves',
        'Deadhead spent flowers to encourage reblooming',
        'Monitor for pests and diseases regularly'
      ]
    }
  },

  // Garden Tools and Equipment
  tools: {
    maintenance: {
      title: 'Garden Tool Maintenance',
      tips: [
        'Clean tools after each use',
        'Sharpen blades regularly',
        'Oil moving parts to prevent rust',
        'Store tools in dry location',
        'Replace damaged handles',
        'Disinfect tools between plants to prevent disease spread'
      ]
    },
    storage: {
      title: 'Tool Storage Tips',
      tips: [
        'Hang tools to prevent damage',
        'Use tool organizers or racks',
        'Keep tools in dry, protected area',
        'Label tools for easy identification',
        'Group similar tools together',
        'Regular inventory and maintenance'
      ]
    }
  },

  // Problem Solving
  problems: {
    pests: {
      title: 'Common Garden Pests',
      solutions: {
        aphids: ['Spray with water', 'Use insecticidal soap', 'Introduce beneficial insects'],
        slugs: ['Hand pick at night', 'Use beer traps', 'Apply diatomaceous earth'],
        spiderMites: ['Increase humidity', 'Spray with water', 'Use miticide if severe'],
        whiteflies: ['Use yellow sticky traps', 'Spray with insecticidal soap', 'Introduce ladybugs']
      }
    },
    diseases: {
      title: 'Common Plant Diseases',
      solutions: {
        powderyMildew: ['Improve air circulation', 'Avoid overhead watering', 'Apply fungicide'],
        blackSpot: ['Remove infected leaves', 'Improve air circulation', 'Apply fungicide'],
        rootRot: ['Improve drainage', 'Reduce watering', 'Remove affected plants'],
        leafSpot: ['Remove infected leaves', 'Avoid overhead watering', 'Apply fungicide']
      }
    },
    environmental: {
      title: 'Environmental Problems',
      solutions: {
        frostDamage: ['Protect with covers', 'Water before frost', 'Plant in sheltered location'],
        heatStress: ['Provide shade', 'Increase watering', 'Mulch to retain moisture'],
        windDamage: ['Plant windbreaks', 'Stake tall plants', 'Choose wind-resistant varieties'],
        drought: ['Mulch heavily', 'Water deeply', 'Choose drought-tolerant plants']
      }
    }
  },

  // Growing Tips by Category
  categories: {
    vegetables: {
      title: 'Vegetable Gardening Tips',
      tips: [
        'Start with easy crops like lettuce, radishes, and tomatoes',
        'Plant in full sun with well-draining soil',
        'Rotate crops to prevent disease',
        'Use companion planting to deter pests',
        'Harvest regularly to encourage production',
        'Test soil and amend as needed'
      ]
    },
    herbs: {
      title: 'Herb Gardening Tips',
      tips: [
        'Most herbs prefer full sun and well-draining soil',
        'Harvest regularly to promote bushier growth',
        'Don\'t over-fertilize - can reduce flavor',
        'Grow annual and perennial herbs together',
        'Dry or freeze excess harvest',
        'Plant near kitchen for easy access'
      ]
    },
    succulents: {
      title: 'Succulent Care Tips',
      tips: [
        'Use well-draining soil mix',
        'Water sparingly - allow soil to dry completely',
        'Provide bright, indirect light',
        'Avoid overwatering - main cause of death',
        'Use shallow pots with drainage holes',
        'Protect from frost and freezing temperatures'
      ]
    },
    indoor: {
      title: 'Indoor Plant Care',
      tips: [
        'Choose plants suitable for your light conditions',
        'Use well-draining potting mix',
        'Water when top inch of soil is dry',
        'Provide humidity for tropical plants',
        'Rotate plants regularly for even growth',
        'Monitor for pests and treat promptly'
      ]
    }
  }
};

// Quick reference guides
export const quickGuides = {
  watering: {
    daily: ['Seedlings', 'New transplants', 'Container plants in hot weather'],
    weekly: ['Established perennials', 'Most shrubs', 'Lawn'],
    monthly: ['Established trees', 'Drought-tolerant plants', 'Succulents']
  },
  fertilizing: {
    monthly: ['Container plants', 'Heavy feeders', 'Vegetables'],
    quarterly: ['Most perennials', 'Shrubs', 'Trees'],
    annually: ['Established trees', 'Native plants', 'Succulents']
  },
  pruning: {
    spring: ['Summer-blooming shrubs', 'Fruit trees', 'Roses'],
    summer: ['Deadheading', 'Shaping', 'Removing dead wood'],
    fall: ['Avoid pruning most plants', 'Clean up only'],
    winter: ['Dormant pruning', 'Structural pruning', 'Fruit trees']
  }
};
