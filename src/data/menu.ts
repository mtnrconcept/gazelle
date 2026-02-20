export type MenuItem = {
    name: string;
    description?: string;
    price?: string;
    image?: string;
};

export type MenuSection = {
    title: string;
    items?: MenuItem[];
    subsections?: MenuSection[];
    notes?: string[];
};

export const menuData: MenuSection[] = [
    {
        title: "ENTRÉES / STARTERS",
        items: [
            {
                name: "SAMBUSA (fait maison)",
                description: "1 pièce · Feuilletés fourrés à la viande de bœuf et aux légumes.",
                price: "3.50 CHF",
                image: "https://lagazelledorgeneva.com/assets/SAMBUSA%20FAIT%20MAISON-D_wwG_sv.jpeg"
            },
            {
                name: "SAMBUSA Végétariens (fait maison)",
                description: "1 pièce · Feuilletés fourrés aux légumes.",
                price: "3.50 CHF",
                image: "https://lagazelledorgeneva.com/assets/SAMBUSA%20FAIT%20MAISON-D_wwG_sv.jpeg"
            },
            {
                name: "TIMATUM SALADE",
                description: "Salade de laitue, tomates, oignons et accompagnée d'une sauce épicée.",
                price: "9.00 CHF",
                image: "https://lagazelledorgeneva.com/assets/TIMATUM%20SALADE-B7XlvVoD.jpg"
            },
            {
                name: "SALADE DU CHEF",
                description: "Une combinaison goûteuse de tomates, oignons, piments, poulet et œufs durs servie sur un lit de laitue.",
                price: "15.00 CHF",
                image: "https://lagazelledorgeneva.com/assets/SALADE%20DU%20CHEF-DwkqqRvX.jpg"
            }
        ]
    },
    {
        title: "PLATS VÉGÉTARIENS / VEGAN",
        items: [
            {
                name: "Shiro (ሽሮ)",
                description: "Purée de pois chiche jaunes marinés et cuits dans une sauce au paprika, assaisonnés d'épices savoureuses.",
                price: "23.00 CHF",
                image: "https://lagazelledorgeneva.com/assets/SHIRO%202-PSgE2QAK.png"
            },
            {
                name: "EPINARD",
                description: "Légumes épicés et hachés, cuits dans un beurre clarifié aux herbes avec des oignons et divers poivres exotiques.",
                price: "20.00 CHF",
                image: "https://lagazelledorgeneva.com/assets/GOMEN-TgvAhhD6.png"
            },
            {
                name: "BIRSIN / MESSER Wet",
                description: "Délicate purée de lentilles au soja, assaisonnée d'oignons, de poivre vert et d'ail.",
                price: "20.00 CHF",
                image: "https://lagazelledorgeneva.com/assets/MESER%20WAT-C7L2tIO7.png"
            },
            {
                name: "BIRSIN / MESSER ALECHA",
                description: "Purée de lentilles cuite à l'ail, oignons et diverses épices.",
                price: "20.00 CHF",
                image: "https://lagazelledorgeneva.com/assets/MISER%20ALECHA-B0dYZVf9.png"
            },
            {
                name: "ATEKELT ALECHA",
                description: "Carottes, haricots et pommes de terre.",
                price: "20.00 CHF",
                image: "https://lagazelledorgeneva.com/assets/ATIKELT%20ALECHA-Dwv78SMj.png"
            },
            {
                name: "Dégustation de légumes",
                description: "Une combinaison des plats shiro, épinards, lentilles (Jaune et rouge), chou et laitue.",
                price: "25.00 CHF (1p) · 45.00 CHF (2p) · 65.00 CHF (3p)",
                image: "https://lagazelledorgeneva.com/assets/D%C3%A9gustation%20de%20L%C3%A9gumes-BHGAtiLV.png"
            }
        ]
    },
    {
        title: "PLATS PRINCIPAUX",
        subsections: [
            {
                title: "AGNEAU / LAMB",
                items: [
                    {
                        name: "Tibs d'agneau",
                        description: "Morceaux d'agneau maigre sautés au beurre incorporés à des oignons, des piments verts et du poivre vert.",
                        price: "32.00 CHF",
                        image: "https://lagazelledorgeneva.com/assets/Tibs%20d'agneau-CTyXF8Tl.png"
                    },
                    {
                        name: "YEBEG WET",
                        description: "Tendres morceaux d'agneau préparés dans un beurre aux herbes, épicés au paprika avec des oignons, du poivre vert et saupoudrés d'ail et de gingembre.",
                        price: "29.00 CHF",
                        image: "https://lagazelledorgeneva.com/assets/ASSA%20WET-BxtpBUC_.png"
                    },
                    {
                        name: "YEBEG ALECHA",
                        description: "Tendres morceaux d'agneau revenus dans un beurre épicé, mélangés à des oignons frais saupoudrés de gingembre, ail et turmeric.",
                        price: "28.00 CHF",
                        image: "https://lagazelledorgeneva.com/assets/YEBEG%20ALECHA-SfotQVP6.png"
                    }
                ]
            },
            {
                title: "BŒUF / BEEF",
                items: [
                    {
                        name: "Zighni / Key Wet",
                        description: "Délicieuses bouchées de bœuf mijotées dans une sauce au paprika et agrémentées d'épices exotiques.",
                        price: "27.00 CHF",
                        image: "https://lagazelledorgeneva.com/assets/zegni%20key%20wet-BOzrfSHq.png"
                    },
                    {
                        name: "Tibs de boeuf",
                        description: "Morceaux de bœuf sautés au beurre incorporés à des oignons, des piments verts et du poivre vert.",
                        price: "30.00 CHF",
                        image: "https://lagazelledorgeneva.com/assets/TIBES%20DE%20BOEUF-Ctf4tzNa.png"
                    },
                    {
                        name: "Kitfo",
                        description: "Steak tartare éthiopien assaisonné avec un beurre aux herbes, des piments rouges finement hachés, du gingembre et du poivre, arrosé avec un goût de whisky.",
                        price: "30.00 CHF",
                        image: "https://lagazelledorgeneva.com/assets/KITEFO-D2dNuOak.png"
                    },
                    {
                        name: "Gored Gored",
                        description: "Tendres lamelles de viande de bœuf cuites dans une sauce au poivre vert légèrement épicée.",
                        price: "30.00 CHF",
                        image: "https://lagazelledorgeneva.com/assets/GORED%20GORED-D9_cWzGx.png"
                    },
                    {
                        name: "ZILZIL WET",
                        description: "Savoureuses lamelles de viande de bœuf cuites à l'étouffée dans une sauce au poivre rouge, paprika, ail, oignons, gingembre frais et cardamone.",
                        price: "28.00 CHF",
                        image: "https://lagazelledorgeneva.com/assets/ZILZIL%20WET-BD7lLkQ-.png"
                    },
                    {
                        name: "ZilzilTibs",
                        description: "Viande bien cuite coupée en lanières avec poivrons, oignons, ail, épinards, laitue et injera.",
                        price: "30.00 CHF"
                    },
                    {
                        name: "Firfir Tibs",
                        description: "Cubes d'agneau, de poulet ou de bœuf frits dans un beurre épicé fondu et des épices traditionnelles. Ingrédients : bœuf, oignons, berbère, poivrons doux, ail, tomates et épices.",
                        price: "28.00 CHF"
                    }
                ]
            },
            {
                title: "POULET / CHICKEN",
                items: [
                    {
                        name: "Doro Wet",
                        description: "Poulet juteux mariné dans du jus de citron, sauté au beurre, assaisonné et cuit à l'étouffée dans une sauce au paprika, accommodé d'oignons, d'ail, de gingembre, ainsi que d'un soupçon de cardamome et de noix de muscade.",
                        price: "27.00 CHF",
                        image: "https://lagazelledorgeneva.com/assets/DORO%20WET-qlKOx6dc.png"
                    },
                    {
                        name: "DORO ALECHA",
                        description: "Délicat plat épicé consistant en morceaux de poulet mijotés dans du beurre aux herbes avec des oignons et du poivre vert, assaisonné avec du gingembre et de l'ail.",
                        price: "25.00 CHF",
                        image: "https://lagazelledorgeneva.com/assets/DORO%20ALECHA-BuTU6DYC.png"
                    }
                ]
            },
            {
                title: "POISSON / FISH",
                items: [
                    {
                        name: "Assa Wet",
                        description: "Poisson cuit dans un beurre aux poivres verts avec gingembre, romarin et jalapeño.",
                        price: "30.00 CHF",
                        image: "https://lagazelledorgeneva.com/assets/ASSA%20WET-BxtpBUC_.png"
                    },
                    {
                        name: "ASSA ALECHA WET",
                        description: "Poisson mijoté dans une sauce aux oignons, ail, gingembre et épices douces.",
                        price: "30.00 CHF"
                    },
                    {
                        name: "Assa Tibs",
                        description: "Poisson mariné dans un vin de miel et sauce Awaze, frit avec romarin, piments et légumes.",
                        price: "31.00 CHF"
                    }
                ]
            }
        ]
    },
    {
        title: "MENU DEGUSTATION",
        notes: ["Tous nos menus sont servis avec de l'injera fait maison. · All menus served with homemade injera."],
        subsections: [
            {
                title: "LA GAZELLE VÉGANE",
                items: [
                    {
                        name: "Menu Végane",
                        description: "Shuro, Alecha, Gomen, Yatkelt Wet, Messer et légumes de saison servis sur injera.",
                        price: "30.00 CHF",
                        image: "https://lagazelledorgeneva.com/assets/D%C3%A9gustation%20de%20L%C3%A9gumes-BHGAtiLV.png"
                    }
                ]
            },
            {
                title: "SPECIALITES DE LA MAISON",
                items: [
                    {
                        name: "Menu 1 personne",
                        price: "32.00 CHF",
                        description: "\"Zegni\" (bouchées de bœuf) et \"Doro\" (poulet) wet (pimenté) ou alecha (sans piment) servis avec deux sortes de légumes.",
                        image: "https://lagazelledorgeneva.com/assets/SPECIALITES%20DE%20LA%20MAISON-CNPs4Yvd.png"
                    },
                    {
                        name: "Menu 2 personnes",
                        price: "60.00 CHF"
                    },
                    {
                        name: "Menu 3 personnes",
                        price: "88.00 CHF"
                    },
                    {
                        name: "Menu 4 personnes",
                        price: "118.00 CHF"
                    },
                    {
                        name: "Menu 5 personnes",
                        price: "138.00 CHF"
                    }
                ]
            },
            {
                title: "LA GAZELLE ROYALE",
                items: [
                    {
                        name: "Menu 2 personnes",
                        description: "\"Agneau\", \"Zegni\", \"Doro wet\" ou \"Doro Alecha\" et \"Meser/Lentilles\" avec deux sortes de légumes.",
                        price: "65.00 CHF",
                        image: "https://lagazelledorgeneva.com/assets/LA%20GAZELLE%20ROYALE-EI-niyer.png"
                    },
                    {
                        name: "Menu 3 personnes",
                        price: "95.00 CHF"
                    },
                    {
                        name: "Menu 4 personnes",
                        price: "125.00 CHF"
                    },
                    {
                        name: "Menu 5 personnes",
                        price: "150.00 CHF"
                    }
                ]
            }
        ]
    },
    {
        title: "BOISSONS",
        items: [
            {
                name: "Vin rouge / blanc / rosé (50cl)",
                price: "24.00 CHF"
            },
            {
                name: "Vin rouge / blanc / rosé (75cl)",
                price: "35.00 CHF"
            },
            {
                name: "Cocktail avec alcool",
                price: "12.00 CHF"
            },
            {
                name: "Cocktail sans alcool",
                price: "8.00 CHF"
            },
            {
                name: "Thé et café traditionnel",
                description: "Thé ou café servi à la manière traditionnelle.",
                price: "4.50 CHF"
            },
            {
                name: "Cérémonie du café éthiopien",
                description: "Café torréfié sur place, servi traditionnellement avec encens.",
                price: "7.50 CHF"
            },
            {
                name: "Café simple",
                price: "3.50 CHF"
            }
        ]
    }
];
