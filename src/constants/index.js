import {
    benefitIcon1,
    benefitIcon2,
    benefitIcon3,
    benefitIcon4,
    benefitImage2,
    chromecast,
    disc02,
    discord,
    discordBlack,
    facebook,
    figma,
    file02,
    framer,
    homeSmile,
    instagram,
    loading,
    notification2,
    notification3,
    notification4,
    notion,
    photoshop,
    plusSquare,
    protopie,
    raindrop,
    recording01,
    recording03,
    roadmap1,
    roadmap2,
    roadmap3,
    roadmap4,
    searchMd,
    slack,
    sliders04,
    telegram,
    twitter,
    yourlogo,
  } from "../../src/assets";
  
  export const navigation = [
    {
      id: "1",
      title: "How to use",
      url: "#how-to-use",
    },
    {
      id: "2",
      title: "Roadmap",
      url: "#roadmap",
    },
    {
      id: "3",
      title: "Pricing",
      url: "#pricing",
    },
    
    
    {
      id: "4",
      title: "New account",
      url: "#signup",
      onlyMobile: true,
    },
    {
      id: "5",
      title: "Sign in",
      url: "#login",
      onlyMobile: true,
    },
  ];
  
  export const heroIcons = [homeSmile, file02, searchMd, plusSquare];
  
  export const notificationImages = [notification4, notification3, notification2];
  
  export const companyLogos = [yourlogo, yourlogo, yourlogo, yourlogo, yourlogo];
  
  
  export const roadmap = [
    {
      id: "0",
      title: "Voice visualization ",
      text: "",
      date: "Dec 2024",
      status: "done",
      imageUrl: roadmap1,
      colorful: true,
    },
    {
      id: "1",
      title: "look cool",
      text: "perfect tool for you to play songs on a house party ",
      date: "May 2023",
      status: "progress",
      imageUrl: roadmap2,
    },
    {
      id: "2",
      title: "Customization being worked on",
      text: "coming soon",
      date: "May 2023",
      status: "done",
      imageUrl: loading,
    },
    {
      id: "3",
      title: "Integration with APIs",
      text: "coming soon",
      date: "May 2023",
      status: "progress",
      imageUrl: roadmap4,
    },
  ];
  


  export const pricing = [
    {
      id: "0",
      title: "Basic",
      description: "Basic Audio Visualization",
      price: "0",
      features: [
        "You can upload and play your fav songs ",
        "On top of that you can have some really cool visualizations ",
        "The whole thing is sick if u get it for free ",
      ],
    },
    {
      id: "1",
      title: "Premium",
      description: "Advanced AI chatbot and priority support",
      price: "3.33",
      features: [
        "An advanced AI chatbot that can understand your queries",
        "And edit the audios according to you in real time ",
        "Priority support to solve issues quickly",
      ],
    },
    {
      id: "2",
      title: "Enterprise",
      description: "Custom AI chatbot, advanced analytics, dedicated account",
      price: null,
      features: [
        "Coming soon",
        "Coming soon",
        "Coming soon",
      ],
    },
  ];
  
  export const benefits = [
    {
      id: "0",
      title: "Ask anything",
      text: "Lets users act cool amongst their peers",
      backgroundUrl: "assets/benefits/card-1.svg",
      iconUrl: benefitIcon1,
      imageUrl: benefitImage2,
    },
    {
      id: "1",
      title: "Improvement  everyday",
      text: "The app will eventually have a Caption Generator Too which is being worked on",
      backgroundUrl: "assets/benefits/card-2.svg",
      iconUrl: benefitIcon2,
      imageUrl: benefitImage2,
      light: true,
    },
    {
      id: "2",
      title: "Have ur own personalised music player",
      text: "Paste your youtube playlist and let the music play ",
      backgroundUrl: "assets/benefits/card-3.svg",
      iconUrl: benefitIcon3,
      imageUrl: benefitImage2,
    },
    
  ];
  
  export const socials = [
    {
      id: "0",
      title: "Discord",
      iconUrl: discordBlack,
      url: "#",
    },
    {
      id: "1",
      title: "Twitter",
      iconUrl: twitter,
      url: "#",
    },
    {
      id: "2",
      title: "Instagram",
      iconUrl: instagram,
      url: "#",
    },
    {
      id: "3",
      title: "Telegram",
      iconUrl: telegram,
      url: "#",
    },
    {
      id: "4",
      title: "Facebook",
      iconUrl: facebook,
      url: "#",
    },
  ];