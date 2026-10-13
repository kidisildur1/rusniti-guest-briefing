// ===== data/guest_intro.en.js =====
// Introductory safety briefing — TMK Research Centre LLC / RusNITI JSC
// Card format: icon, title, sub, type (rule / ban / ok)
// microCheck: { q, options[], correct (index), explanation }

window.GUEST_INTRO_EN = [
  {
    id: 1,
    title: "Company premises",
    cards: [
      { icon: "map", title: "Enter only through the checkpoint", sub: "Vehicles enter through a separate entrance", type: "rule" },
      { icon: "walk", title: "Move around only with an escort", sub: "You may move around the company premises only when accompanied by a company representative", type: "rule" },
      { icon: "car", title: "Follow traffic rules on site", sub: "Traffic rules must be followed when moving around the company premises", type: "rule" },
      { icon: "stairs", title: "Hold the handrail on stairs", sub: "Do not use a mobile phone or read when going up or down stairs", type: "rule" },
      { icon: "phone-off", title: "Put your phone away in production areas", sub: "Mobile phone use is prohibited in production areas", type: "ban" },
      { icon: "ban", title: "Alcohol and prohibited substances are banned", sub: "Bringing alcohol, narcotic drugs or explosives onto the premises is strictly prohibited", type: "ban" }
    ],
    microCheck: {
      q: "How are you allowed to move around the company premises?",
      options: [
        "On your own, using any convenient route",
        "Only when accompanied by a company representative",
        "With any company employee",
        "Only around the perimeter of the building"
      ],
      correct: 1,
      explanation: "You may move around the premises only when accompanied by a company representative."
    }
  },
  {
    id: 2,
    title: "Electrical safety rules",
    cards: [
      { icon: "zap", title: "Do not touch live electrical parts", sub: "This includes live wires, busbars, terminals and contacts", type: "ban" },
      { icon: "tag", title: "Do not remove warning signs or notices", sub: "Electrical hazard signs indicate a real risk of electric shock", type: "ban" },
      { icon: "fence", title: "Do not go beyond protective barriers", sub: "This includes high-voltage equipment and electrical distribution areas", type: "ban" },
      { icon: "power", title: "Do not switch on electrical equipment yourself", sub: "Only authorized personnel may operate electrical equipment", type: "ban" },
      { icon: "alert", title: "Do not use faulty electrical equipment", sub: "Damaged insulation, broken housings, faulty sockets and plugs", type: "ban" }
    ],
    microCheck: {
      q: "What is strictly prohibited when dealing with electrical equipment?",
      options: [
        "Watching it operate",
        "Switching it on or off yourself",
        "Taking photographs of its exterior",
        "Keeping clear of it"
      ],
      correct: 1,
      explanation: "Switching any electrical equipment on or off yourself is strictly prohibited. Only authorized personnel may operate it."
    }
  },
  {
    id: 3,
    title: "Conduct on company premises",
    cards: [
      { icon: "check", title: "Follow occupational health and safety requirements", sub: "Follow the instructions of the designated company employee", type: "rule" },
      { icon: "bell", title: "Report hazardous situations immediately", sub: "If you identify a violation, notify the designated employee immediately", type: "rule" },
      { icon: "hard-hat", title: "Use the personal protective equipment provided", sub: "Personal protective equipment (PPE) is mandatory in production and laboratory areas", type: "rule" },
      { icon: "fence", title: "Do not cross warning markings or barriers", sub: "You must comply with safety signs and information notices", type: "ban" },
      { icon: "alert", title: "Do not touch moving equipment parts", sub: "Rotating and moving mechanisms present a risk of injury", type: "ban" },
      { icon: "ban", title: "Do not enter areas where lifting equipment is operating", sub: "Do not leave the designated safe route without permission", type: "ban" }
    ],
    microCheck: {
      q: "What must you do if you identify a violation of occupational health and safety requirements?",
      options: [
        "Correct it yourself and continue the tour",
        "Report it immediately to the designated company employee",
        "Make a note and report it at the first convenient opportunity",
        "Nothing — it is not the responsibility of a visitor on a business trip"
      ],
      correct: 1,
      explanation: "Violations of occupational health and safety requirements must be reported immediately to the designated employee."
    }
  },
  {
    id: 4,
    title: "Workplace sanitation and personal hygiene",
    cards: [
      { icon: "drop", title: "Maintain personal hygiene at work", sub: "Keep your clothing and hands clean, and take responsibility for your health", type: "rule" },
      { icon: "fork", title: "Eat only in designated areas", sub: "Use rooms that meet sanitation and hygiene requirements", type: "rule" },
      { icon: "ban", title: "Eating in laboratories and production workshops is prohibited", sub: "There is a risk of contact with chemical reagents and industrial contaminants", type: "ban" },
      { icon: "hand", title: "Wash your hands before eating and after working with equipment", sub: "Handwashing is mandatory after visiting chemical laboratories and production areas", type: "ok" },
      { icon: "vest", title: "Use PPE when visiting workshops and laboratories", sub: "The personal protective equipment provided must be used", type: "rule" }
    ],
    microCheck: {
      q: "Where is eating permitted on company premises?",
      options: [
        "In any unoccupied room",
        "In a laboratory during a short break",
        "Only in designated areas that meet sanitation and hygiene requirements",
        "At a workstation if no chemical reagents are present"
      ],
      correct: 2,
      explanation: "Eating is permitted only in designated areas that meet sanitation requirements. Eating in laboratories and production workshops is prohibited."
    }
  },
  {
    id: 5,
    title: "Personal protective equipment",
    cards: [
      { icon: "glasses", title: "Safety glasses", sub: "Protect your eyes from dust, splashes and flying particles", type: "rule" },
      { icon: "hard-hat", title: "Safety helmet", sub: "Protects your head from impacts and falling objects", type: "rule" },
      { icon: "headphones", title: "Earplugs / earmuffs", sub: "Mandatory when noise levels exceed 80 dB", type: "rule" },
      { icon: "vest", title: "High-visibility vest", sub: "Mandatory in areas where vehicles and lifting equipment move", type: "rule" },
      { icon: "glove", title: "Protective gloves", sub: "For contact with equipment, chemicals, sharp edges and surfaces", type: "rule" }
    ],
    microCheck: {
      q: "When must you use the personal protective equipment provided?",
      options: [
        "Only when a clear hazard is visible",
        "At your own discretion",
        "Whenever you visit production workshops and laboratories",
        "Only when working with chemicals"
      ],
      correct: 2,
      explanation: "The PPE provided is mandatory in production and laboratory areas, without exception."
    }
  },
  {
    id: 6,
    title: "Hazards on company premises",
    cards: [
      { icon: "ice", title: "Slippery and uneven surfaces", sub: "Ice, wet floors and changes in floor level present a risk of falling", type: "ban" },
      { icon: "zap", title: "Electric current", sub: "Contact with live parts or faulty electrical equipment can cause electric shock", type: "ban" },
      { icon: "alert", title: "Moving equipment and vehicles", sub: "Failure to keep a safe distance or observe traffic zones presents a risk of injury", type: "ban" },
      { icon: "monitor", title: "Computers and office equipment", sub: "Overheating and damaged insulation present a fire hazard", type: "rule" },
      { icon: "flask", title: "Chemical reagents and vapours", sub: "Contact with reagents and toxic substances in laboratory areas", type: "ban" },
      { icon: "eye", title: "Increased eye strain", sub: "From prolonged work with screens and optical equipment", type: "rule" }
    ]
  },
  {
    id: 7,
    title: "First aid",
    firstAid: true,
    cards: []
  }
];
