export const navigationItems = [
  { label: "overview", href: "#overview" },
  { label: "coreFeatures", href: "#features" },
  { label: "roadmap", href: "#roadmap" },
  { label: "governanceCommunity", href: "#governance" },
  { label: "docs", href: "#docs" },
];

// External links
export const DAPP_URL = "https://dapp.phnx.finance"; // TODO: 替换为实际的 dapp 地址
// Feature data with translation keys
const featuresData = [
  {
    id: "01",
    key: "mint",
    icon: "/img/icon-07-1.png",
    gradient: "from-[#ffa700]/20 to-[#ff8c00]/20",
    hoverGradient: "from-[#ffa700]/30 to-[#ff8c00]/30",
    iconBg: "bg-gradient-to-br from-[#ffa700]/20 to-[#ff8c00]/10",
  },
  {
    id: "02", 
    key: "borrow",
    icon: "/img/icon-03-1.png",
    gradient: "from-[#00d4ff]/20 to-[#0099cc]/20",
    hoverGradient: "from-[#00d4ff]/30 to-[#0099cc]/30",
    iconBg: "bg-gradient-to-br from-[#00d4ff]/20 to-[#0099cc]/10",
  },
  {
    id: "03",
    key: "stake", 
    icon: "/img/icon-09-1.png",
    gradient: "from-[#d03d0a]/20 to-[#ff4500]/20",
    hoverGradient: "from-[#d03d0a]/30 to-[#ff4500]/30",
    iconBg: "bg-gradient-to-br from-[#d03d0a]/20 to-[#ff4500]/10",
  },
  {
    id: "04",
    key: "quest",
    icon: "/img/icon-24-1.png", 
    gradient: "from-[#9d4edd]/20 to-[#7209b7]/20",
    hoverGradient: "from-[#9d4edd]/30 to-[#7209b7]/30",
    iconBg: "bg-gradient-to-br from-[#9d4edd]/20 to-[#7209b7]/10",
  },
  {
    id: "05",
    key: "community",
    icon: "/img/icon-13-1.png",
    gradient: "from-[#06ffa5]/20 to-[#00cc83]/20", 
    hoverGradient: "from-[#06ffa5]/30 to-[#00cc83]/30",
    iconBg: "bg-gradient-to-br from-[#06ffa5]/20 to-[#00cc83]/10",
  },
];


export const roadmapPhases = [
  {
    phase: "Phase 1",
    quarter: "Q4 2025",
    description:
      "Phoenix Protocol goes live, gradually rolling out core features including Mint, Borrow, Convert, Staking, Liquidity Mining, Cross-Chain Yield, and Community Quest Points",
    dotColor: "#ffa700",
    left: "401px",
    top: "3501px",
  },
  {
    phase: "Phase 2",
    quarter: "Q1 2026",
    description:
      "$FIRE governance token launches on major DEXs and CEXs, driving adoption of Phoenix stablecoins and ecosystem participation, fueling governance and growth",
    dotColor: "#ffa700",
    left: "909px",
    top: "3297px",
  },
  {
    phase: "Phase 3",
    quarter: "Q2 2026",
    description:
      "Multi-chain expansion, integrating more RWA assets across networks while extending yield-bearing PUSD and $FIRE use cases, driving ecosystem growth toward a $10B on-chain bank",
    dotColor: "#df5d07",
    left: "1418px",
    top: "3241px",
  },
];

export const governanceFeatures = [
  {
    title: "DAO",
    description:
      "Progressive DAO to gradually achieve decentralized decision-making",
    icon: "/img/dao.png",
  },
  {
    title: "FIRE",
    description: "$FIRE governance token for rights and value capture",
    icon: "/img/fire.png",
  },
  {
    title: "Badge + Point",
    description:
      "Badge + point-weighted voting to empower contributors with greater influence",
    icon: "/img/badge-point.png",
  },
];

export const communityEngagement = [
  {
    title: "Proposals & Voting",
    description: "Submit and vote to shape the ecosystem",
    left: "850px",
    top: "900px",
    dotLeft: "1046px",
    dotTop: "1060px",
  },
  {
    title: "Quests & Points",
    description: "Earn points from activities, redeemable for Phoenix tokens",
    left: "150px",         
    top: "1150px",
    dotLeft: "295px",
    dotTop: "1329px",
  },
  {
    title: "Incentives & Recognition",
    description: "Badges, leaderboards, and rewards for contributors",
    left: "1450px",
    top: "900px",
    dotLeft: "1646px",
    dotTop: "1077px",
  },
  {
    title: "Co-Building & Growth",
    description: "Events and partnerships expand Phoenix globally",
    left: "1450px",
    top: "1250px",
    dotLeft: "1672px",
    dotTop: "1420px",
  },
];

export const partners = [
  { name: "Listadao", icon: "/img/mask-group-3.png", row: 1 },
  { name: "Uniswap", icon: "/img/image-7.png", row: 1 },
  { name: "Pancakeswap", icon: "/img/mask-group.png", row: 1 },
  { name: "Layerzero", icon: "/img/mask-group-1.png", row: 1 },
  { name: "Base", icon: "/img/mask-group-5.png", row: 2 },
  { name: "BNB Chain", icon: "/img/mask-group-6.png", row: 2 },
  { name: "Chainlink", icon: "/img/mask-group-2.png", row: 2 },
  { name: "Arbitrum", icon: "/img/mask-group-4.png", row: 2 },
];

export const socialLinks = [
  { icon: "/img/mask-group-7.png", alt: "Social 1" },
  { icon: "/img/mask-group-8.png", alt: "Social 2" },
  { icon: "/img/mask-group-9.png", alt: "Social 3" },
];

export const footerResources = [
  { label: "Blog", href: "#blog" },
  { label: "Docs", href: "#docs" },
  { label: "GitHub", href: "#github" },
  { label: "Contact", href: "#contact" },
];

export const footerSecurity = [
  { label: "Audits", href: "#audits" },
  { label: "Privacy Policy", href: "#privacy" },
  { label: "Terms of Use", href: "#terms" },
];
