const products = [
    {
        id: "dell-xps-13-plus",
        product_type: "Laptop",
        product_link: "https://www.amazon.in/Dell-Inspiron-Enabled-Processor-LPDDR5X/dp/B0DSFRYXDG/ref=sr_1_3?crid=NW5BHETYOAWA&dib=eyJ2IjoiMSJ9.k8wtrYYxjpoWou42kzr0p2M2JqVbiW7BJUNDY7IOXpRYKvu5dYkhBCX8P_F4Rs5ajmyFppGcBml3ACY8o4t9s-UWs70EPPOqvcd_XB7f185DsDjqcwVSfO4_Gdc4Ae2uIiWS_1kgACa0vNUVmP4hwasgqALm1Yd42LkyGQ5TyIN6oCUuFjxVtQnF9VvmymB9ie8ymEqhASZ1BpPVWiAVf2MSUhhElFTU6wJ-kj-W1cM.6PFwHkCggp4NiDQ3wGRLqx9jcMCX-a7c0lpa7cDgcyQ&dib_tag=se&keywords=dell+xps+13+plus&nsdOptOutParam=true&qid=1757594075&sprefix=dell+xps+13+plus%2Caps%2C675&sr=8-3",
        name: "Dell XPS 13 Plus",
        price: "₹89,999",
        oldPrice: "₹92,000",

        availableAt: ["Dell Store", "Amazon", "Flipkart"],
        lowestPrice: "₹87,999",
        image: "https://i.pcmag.com/imagery/reviews/06Ug0e0tlPFOh5qZAAcpq10-1..v1688849689.jpg",
        specs: {
            Processor: "Intel Core i7 13th Gen",
            RAM: "16GB LPDDR5",
            Storage: "512GB SSD",
            Display: "13.4-inch OLED",
        },
        description: "The Dell XPS 13 Plus is a 13.4-inch Windows ultrabook released in 2023, designed for professionals and creators who prioritize cutting-edge design and performance. Key features include a borderless InfinityEdge display, Intel’s 12th Gen Core i7 processor, a seamless glass touchpad, and a capacitive touch function row. With a premium aluminum chassis and Thunderbolt 4 connectivity, it delivers a futuristic experience in a compact form factor.",

    },
    {
        id: "macbook-air-m3-15",
        product_type: "Laptop",
        product_link: "https://www.amazon.in/Apple-2024-MacBook-Laptop-chip/dp/B0DLHG942M/ref=sr_1_1_sspa?adgrpid=160343180353&dib=eyJ2IjoiMSJ9.qzpQFjen0yvEvheYSCWLxMzjo0cWtj8yiZ8LAi5maMB_qZpciMKS7TuISuvrgerMJaA8gQpdOfmXhpgIQBoVN3cM1J8DHyerXkjq3UyfgiKcSZBQ3ekmXHVaHi9oH_TGHUqZxoOEQfCg8jATYg-pMiHyrF8l-BCm24prVld0-egE6oA-oqapmDHooxlAbf99ipY-um_-cBZde7JLaT050E9SqOubyp8la3lCLbJ1VFY.9C6c9QFqD5WXpjlgYCv1fpD7UydWdnynNMQBw_A_KQ8&dib_tag=se&gad_source=1&hvadid=763237048500&hvdev=c&hvlocphy=9151430&hvnetw=g&hvqmt=e&hvrand=17551408213586313366&hvtargid=kwd-1967620861651&hydadcr=26946_2890129&keywords=macbook+air+m3+15&mcid=c51e1c1a6b10315aaa2035851f29daad&qid=1757596189&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1",
        name: "MacBook Air M3 15-inch",
        price: "₹1,23,900",
        oldPrice: "₹1,34,900",

        availableAt: ["Apple Store", "Amazon", "Vijay Sales"],
        lowestPrice: "₹1,28,900",
        image: "https://imageio.forbes.com/specials-images/imageserve/65edf9344bf5e45e09a32b1b/0x0.jpg?format=jpg&height=900&width=1600&fit=bounds",
        specs: {
            Processor: "Apple M3 Chip",
            RAM: "8GB Unified",
            Storage: "256GB SSD",
            Display: "15-inch Liquid Retina",
        },
        description: "The MacBook Air M3 is a 15.3-inch fanless laptop launched by Apple in 2025, aimed at students, developers, and mobile professionals. It features Apple’s M3 chip with hardware-accelerated graphics, a vibrant Liquid Retina display, up to 24GB unified memory, and all-day battery life. With MagSafe charging, support for dual external displays, and spatial audio, it blends performance and portability in a sleek aluminum body. ",

    },
    {
        id: "lenovo-idea-tab-pro",
        product_type: "Mobile",
        product_link: "https://www.lenovo.com/in/en/p/tablets/android-tablets/lenovo-tab-series/lenovo-idea-tab-pro/zae40195in",
        name: "Lenovo Idea Tab Pro 12GB 256GB",
        price: "₹30,999",
        oldPrice: "₹48,999",

        availableAt: ["Amazon", "Croma", "Lenovo Store"],
        lowestPrice: "₹30,998",
        image: "https://p3-ofp.static.pub//fes/cms/2025/03/11/1byjvmzo2dwgi566c7o5cn62vd8nwk011088.png",
        specs: {
            Processor: "MediaTech Hellios 8300",
            RAM: "12GB",
            Storage: "256GB SSD",
            Display: "12.7inch 3K 144Hz display",
            Battery: "10200mAH 44W charger",
            OS: "Android 14, +2 year update"
        },
        description: "The Lenovo Idea Tab Pro is a 12.7-inch Android tablet released in 2025, primarily marketed toward students and everyday users. Key features include a high-refresh-rate 3K display, a powerful MediaTek processor, quad JBL speakers, and an included stylus. ",
    },
    {
        id: "samsung-galaxy-s24-ultra",
        product_type: "Mobile",
        product_link: "https://www.lenovo.com/in/en/p/tablets/android-tablets/lenovo-tab-series/lenovo-idea-tab-pro/zae40195in",
        name: "Samsung Galaxy S24 Ultra",
        price: "₹93,939",
        oldPrice: "₹1,49,999",

        availableAt: ["Amazon", "Flipkart", "Samsung Store"],
        lowestPrice: "₹129999",
        image: "https://images.samsung.com/is/image/samsung/assets/in/smartphones/galaxy-s24-ultra/buy/S24Ultra-Color-Titanium_Blue_MO_0527_final.jpg",
        specs: {
            Display: "6.8-inch QHD+ Dynamic AMOLED 2X, 120Hz",
            Processor: "Snapdragon 8 Gen 3 for Galaxy",
            RAM: "12GB",
            Storage: "256GB / 512GB / 1TB",
            RearCamera: "200MP + 50MP + 12MP + 10MP Quad Camera",
            FrontCamera: "12MP",
            Battery: "5000mAh with 45W fast charging",
            OS: "Android 14 with One UI 6.1",
            Connectivity: "5G, Wi-Fi 6E, Bluetooth 5.3, USB Type-C",
        },
        description: "The Samsung Galaxy S24 Ultra is Samsung’s flagship smartphone featuring a 200MP camera system, Snapdragon 8 Gen 3 performance, an immersive 6.8-inch AMOLED display, and S Pen support—designed for ultimate productivity and creativity."
    },
    {
    id: "apple-iphone-16-pro",
    product_type: "Mobile",
    product_link: "https://www.amazon.in/iPhone-16-Pro-256-GB/dp/B0DGHQ717F/ref=sr_1_1?crid=1SXEH0URBZ383&dib=eyJ2IjoiMSJ9.n9nPvt3rAmu5Jj1hT7rhvgCDpjgji9qb89e1cMtyXdgkzmc2uLVs5LV_3us-R1hfgFVrXUK6IDTGonWMRKrC_YNUrnaHIrDBHkyuny1hPt7Ajesu0CCiURGkpUWKrwkciu5ePPoGwketY2l4pAEcLE9ZH6cqwU8XTffpuq8DMkaXQXuqqg6kVn_Hz6GJ6scwJuSSTS35e05X2aJljGZECC4A6ZRmzNFC0_iaddcss1E.QCZ14UKdunWruOiGbZqg_iemWzmHQZ5hzabbm16_ITM&dib_tag=se&keywords=iphone+16pro&qid=1757597189&sprefix=iphone+16pro%2Caps%2C412&sr=8-1",
    name: "Apple iPhone 16 Pro",
    price: "₹1,17,900",
    oldPrice: "₹1,29,900",

    availableAt: ["Amazon", "Flipkart", "Apple Store"],
    lowestPrice: "₹1,12,900",
    image: "https://imageio.forbes.com/specials-images/imageserve/66feb922afb1f2747d65b116/Apple-iPhone-16-finish-lineup-240909/960x0.jpg?format=jpg&width=960",
    specs: {
        Display: "6.3-inch LTPO Super Retina XDR OLED, 120Hz, HDR10, Dolby Vision",
        Processor: "Apple A18 Pro (3nm)",
        RAM: "8GB",
        Storage: "128GB / 256GB / 512GB / 1TB",
        RearCamera: "48MP Main + 48MP Ultra Wide + 12MP Telephoto (5x optical zoom)",
        FrontCamera: "12MP TrueDepth",
        Battery: "3582mAh with 25W wired, 15W wireless charging",
        OS: "iOS 18 (upgradable)",
        Connectivity: "5G, Wi-Fi 6E, Bluetooth 5.3, USB-C",
    },
    description: "The iPhone 16 Pro features a titanium design, Apple’s A18 Pro chip, and a triple-lens camera system with 5x optical zoom. Its 6.3-inch OLED display supports ProMotion and HDR, making it a powerhouse for photography, gaming, and productivity."
},
    {
        id: "sony-wh-1000xm6",
        product_type: "Audio",
        product_link: "amazon.in/Sony-WH-1000XM5-Wireless-Cancelling-Headphones/dp/B09XS7JWHH/ref=sr_1_1?crid=2WLE7B10DMLKR&dib=eyJ2IjoiMSJ9.nMJ5w2BbOTPjlYQEuQ9ZPsPRrkCE1WvTnHEIv0-FPV3K7vhUgOecICxTDSSBBqF4858pn4BVMjN8NvVyTL66R9UIRQ0aLC80akb6KbplENr8Dkolnv-1_k7qeozYFRvpZPix7DLBazubl1Nf-oCXnzDkGMvgQx4qrpTI6ntBVdFCXofwx6JlLIZ9QgNZ-gn96AcAGO1xP5U_9pu80ArWn7kr3NLIRpDwJ5kFM92sWNQ._9QphyWIocP-3NFyhrlYUsWLrt51z9uzlDYE-vBSBhw&dib_tag=se&keywords=sony-wh-1000xm6&nsdOptOutParam=true&qid=1757596264&sprefix=sony-wh-1000xm6%2Caps%2C450&sr=8-1",
        name: "Sony WH-1000XM6 Wireless Headphones",
        price: "₹29,990",
        oldPrice: "₹34,990",

        availableAt: ["Sony Center", "Amazon", "Reliance Digital"],
        lowestPrice: "₹28,499",
        image: "https://cdn.headphonecheck.com/wp-content/uploads/Sony-WH-1000XM6-1-1-1920x1080.jpg",
        specs: {
            Driver: "40mm HD Hybrid Drivers",
            NoiseCancellation: "Adaptive ANC with AI",
            Battery: "40 hours playback",
            Connectivity: "Bluetooth 5.3, LDAC, AAC, SBC",
            Controls: "Touch + Voice Assistant",
        },
        description: "The Sony WH-1000XM6 is the flagship over-ear headphone for audiophiles and commuters alike. Featuring AI-powered adaptive noise cancellation, LDAC support, and ultra-long battery life, it delivers immersive sound with studio-grade clarity."
    },
    {
        id: "msi-mag-255xf",
        product_type: "Display",
        product_link: "https://www.amazon.in/MSI-MAG-255XF-Gaming-Monitor/dp/B0DY14C946/ref=sr_1_1?crid=1THNBR0KEQO3R&dib=eyJ2IjoiMSJ9.nYZJVy0Axbm-95As_G83wp4kHcZM-2q7uDfW8qkir2Sn-KLH-weA0yOoQcc6qEBG2SmmxRMuwADSuoQmHZvtRfgbVByHMBBGiVqzjJvX9XAAWKeMW5xz632SY0OXlBMx6p_KnlMt-995X64OosnHjZst5W4SLztoWWBwf6ZzQ1EOj_Vf8jVkd70qCytsl7wwR792492lvC-dfjcko7Jk0gJXVq2WQbYblhhjv2tCJ_I.JIjB06_rnxutKgUCi3hiPw-nW41-sQLs-zsh5tXCssQ&dib_tag=se&keywords=msi-mag-255xf&qid=1757596294&sprefix=msi-mag-255xf%2Caps%2C504&sr=8-1",
        name: "MSI MAG 255XF FHD Gaming Monitor",
        price: "₹15,711",
        oldPrice: "₹44,990",

        availableAt: ["MSI Store", "Amazon", "MD Computers"],
        lowestPrice: "₹15,499",
        image: "https://modxcomputerscomca8ca.zapwp.com/q:i/r:0/wp:1/w:480/u:https://modxcomputers.com/wp-content/uploads/2025/03/1024-5.png", // Replace with actual 255XF image if available
        specs: {
            Resolution: "1920 x 1080 (Full HD)",
            Panel: "Rapid IPS with HDR Ready",
            RefreshRate: "48Hz – 300Hz",
            ResponseTime: "0.5ms (GtG)",
            Ports: "2x HDMI 2.0b, 1x DisplayPort 1.4a, Headphone-out",
            ColorAccuracy: "120% sRGB, 87% Adobe RGB",
        },
        description: "The MSI MAG 255XF is a 24.5-inch gaming monitor built for speed and precision. Featuring a 300Hz refresh rate, ultra-fast 0.5ms response time, and HDR-ready Rapid IPS panel, it delivers buttery-smooth visuals for competitive gamers. With wide color coverage and anti-glare coating, it's equally suited for immersive play and creative work."
    },
    {
        id: "logitech-g502-hero",
        product_type: "Peripheral",
        product_link: "https://www.amazon.in/Logitech-Hero-Gaming-Mouse-Black/dp/B07GBZ4Q68/ref=sr_1_2?crid=QRWX11W013ZQ&dib=eyJ2IjoiMSJ9.dmDlRDELeVeke6pESUrOO2I5vKkt5WPbfNi-hh8wVgG2spVp3SoctbfRTMVttd59d0wMn6E00CJFfWQzoHHU59SWoj67PSUZSsJjJM3C402Hd1KBW8g2n4UxHTfztgvSC9D8_Swapk6v3SRjfB5ImoyoKXe7-KacdHycek6DrU7vWttXAEAHQiPD1LvcjMg_DXATMDB7LikNy2kBthqNIySTmGE33LGvLDho96lxw_c.uhyJDDcItkWd6zewXuFWPiKlx2s84XDcEWC8tpqk_-4&dib_tag=se&keywords=logitech%2Bg502%2Bhero&qid=1757596395&sprefix=logitech-g502-hero%2Caps%2C387&sr=8-2&th=1",
        name: "Logitech G502 HERO High Performance Gaming Mouse",
        price: "₹3,995",
        oldPrice: "₹5,495",

        availableAt: ["Amazon", "Flipkart", "Logitech Store"],
        lowestPrice: "₹3,899",
        image: "https://www.simplygaming.in/cdn/shop/files/Logitech_G502_HERO_RGB_Gaming_Mouse_in_Black_with_HERO_25K_sensor_and_customizable_RGB_lighting..png?v=1734337616",
        specs: {
            Sensor: "HERO 25K Optical Sensor",
            DPI: "100 – 25,600",
            Buttons: "11 Programmable",
            Connectivity: "Wired USB",
            Weight: "Adjustable (up to 18g)",
            RGB: "LIGHTSYNC RGB",
            Memory: "Onboard profiles (up to 5)",
            ScrollWheel: "Dual-mode (hyper-fast + precision)",
            Compatibility: "Windows, macOS",
        },
        description: "The Logitech G502 HERO is a wired gaming mouse engineered for precision and customization. Featuring the HERO 25K sensor, 11 programmable buttons, adjustable weights, and LIGHTSYNC RGB, it’s a top-tier choice for competitive gamers and power users. Save profiles onboard and tune DPI on-the-fly for ultimate control."
    },
    {
        id: "logitech-g213-prodigy",
        product_type: "Peripheral",
        product_link: "https://www.amazon.in/Logitech-LIGHTSYNC-Spill-Resistant-Customizable-Multi-Media/dp/B01K48R5V4/ref=sr_1_1?crid=2JZRLHC5MUAM4&dib=eyJ2IjoiMSJ9.Tjs1jWOCLBCuz19bXXi69BlSedh11rxYwt8mqWhTzPyVjz6IQOasyLCGgxA3L_e1UJ0jlSY-wAjZzkvSVagNh7hSXGxClDD1Q2CGN9_SKhDW4Lz4b02XGe8sST_fVn0zB5LT9Mhwm9n6lp5UIRwYKqtIy23iZ9tYOzJ7bfxOMy2x8Mz8naUcDWWqXmOBQs7ltamCAQBGhUyjkdZOJ1mbglsfBx28j47O9Ot7XFrZQs0.CtfuzeS0fiu4ekwC-XIXVXpiLwMhP4OROK-pvYuSPQY&dib_tag=se&keywords=logitech-g213-prodigy&qid=1757596422&sprefix=logitech-g213-prodigy%2Caps%2C514&sr=8-1",
        name: "Logitech G213 Prodigy RGB Gaming Keyboard",
        price: "₹4,495",
        oldPrice: "₹5,295",

        availableAt: ["Amazon", "Flipkart", "Logitech Store"],
        lowestPrice: "₹4,399",
        image: "https://varietyinfotech.com/wp-content/uploads/61Nt8geXzWL._SL1500_.jpg",
        specs: {
            SwitchType: "Mech-Dome (Membrane)",
            Backlight: "LIGHTSYNC RGB (5 zones)",
            SpillResistance: "Tested up to 60ml",
            MediaControls: "Dedicated volume, play/pause, skip",
            PalmRest: "Integrated",
            Connectivity: "Wired USB 2.0",
            KeyRollover: "Anti-ghosting (multi-key input)",
            SoftwareSupport: "Logitech G HUB",
            Dimensions: "452 x 218 x 33 mm",
            Weight: "1000g",
        },
        description: "The Logitech G213 Prodigy is a full-size RGB gaming keyboard designed for comfort and performance. Featuring Mech-Dome keys tuned for tactile feedback, dedicated media controls, and LIGHTSYNC RGB zones, it’s built to handle intense gaming and everyday spills. The integrated palm rest and adjustable feet ensure long-session comfort, while G HUB software unlocks full customization."
    },
    {
        id: "wd-blue-sn5100-1tb",
        product_type: "Storagetype",
        product_link: "https://www.amazon.in/Western-Digital-Warranty-Internal-WDS100T5B0E-00CPE0/dp/B0FJ8QFWBQ/ref=sr_1_1?crid=16VY5UN0CTZPE&dib=eyJ2IjoiMSJ9.IRqfc9-xeMMeohVVTwJoH-jcqitnGgKFdWRMXYG6H1A3S1lmaVyR5GUymR7f1EunWMJ5S7H2T1yYLTCVLJGgUtbaF0eUguCGwgqGAnsjWlDEvuTX4mUvQDWPIFKcPiMMi4ikmrL8VSG1eEyhxBoAB7eWVewep0xIDoO6SLMcCX57aIgfY7tRtB2_-11oX4AJThJ4kjDTTOphcMqhTd2J7Cw__r-Y0sEifZbV5lEgdoE.s1DtEwstY7zka2oAranOFi10t2MtyjelVaLjMQbUa7E&dib_tag=se&keywords=wd-blue-sn5100-1tb&qid=1757596459&sprefix=wd-blue-sn5100-1tb%2Caps%2C400&sr=8-1",
        name: "WD Blue SN5100 1TB NVMe SSD",
        price: "₹6,999",
        oldPrice: "₹9,999",

        availableAt: ["Amazon", "Flipkart", "MD Computers"],
        lowestPrice: "₹6500",
        image: "https://www.pcgamesn.com/wp-content/sites/pcgamesn/2025/08/wd-blue-sn5100-ssd.jpg",
        specs: {
            Interface: "PCIe Gen4 x4 NVMe",
            ReadSpeed: "7100MB/s",
            WriteSpeed: "6700MB/s",
            FormFactor: "M.2 2280",
            Endurance: "600TBW",
        },
        description: "The WD Blue SN5100 is a blazing-fast PCIe Gen4 SSD designed for gamers and creators. With read speeds up to 7100MB/s, it rivals flagship drives at a fraction of the price."
    },
    {
        id: "corsair-vengeance-ddr5-sodimm-16gb",
        product_type: "Memory",
        product_link: "https://www.amazon.in/Corsair-Compatible-Installation-Multitasking-Compatibility/dp/B09XB3PB8B",
        name: "Corsair Vengeance SODIMM DDR5 16GB",
        price: "₹4,408",
        oldPrice: "₹12,425",

        availableAt: ["Amazon", "Flipkart", "Corsair Store"],
        lowestPrice: "₹5,799",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqpOFofCZKmN8ugkSDz41E1pZvIN3xMQ4gBA&s",
        specs: {
            Capacity: "16GB (1x16GB)",
            Type: "DDR5 SODIMM",
            Speed: "4800MHz (PC5-38400)",
            CASLatency: "CL40",
            Voltage: "1.1V",
            Compatibility: "Intel & AMD laptops, SFF PCs",
            Features: "XMP 3.0 support, plug-and-play install",
            Cooling: "Standard aluminum heatspreader",
            FormFactor: "SODIMM 262-pin",
        },
        description: "Corsair Vengeance DDR5 SODIMM 16GB is a high-speed memory module designed for next-gen laptops and compact PCs. With 4800MHz frequency, CL40 latency, and XMP 3.0 support, it delivers faster load times, smoother multitasking, and improved responsiveness. Easy to install and widely compatible, it’s a smart upgrade for gamers, creators, and power users."
    },
    {
        id: "corsair-vengeance-ddr5-5600",
        product_type: "Memory",
        product_link: "https://www.amazon.in/CORSAIR-Vengeance-1x16GB-5600MHz-CMK16GX5M1B5600C40/dp/B0BLKCGX93/ref=sr_1_1?crid=121ZZUX86UEP3&dib=eyJ2IjoiMSJ9.NEPmFaF5ugCYoTcUNDM1HraaMQ5QZjwhEhIqFmUkxN1fYF-COreMk6erRXZPXZgXzyvoeyrswGskK_Ig4RYeSqgxdn1OGn4cl5hOjvZA1RXcrFcgD7oerD_SHZ0wpPfVVKAB5F9h3b1xEIoXOVUw4po4ug166-Ef_IQtPzVgegx75gCRfTnzKrtIFmrJHZwKYoMrK_fzM7w3oIVBaHbrliBunqhZTlDznHAs8L4umfM.AxI9VLwT45UL3-_Pm8-Y49eg7NZAQB5oZzBF8IbtVhI&dib_tag=se&keywords=corsair-vengeance-ddr5-5600&qid=1757596760&sprefix=corsair-vengeance-ddr5-5600%2Caps%2C495&sr=8-1",
        name: "Corsair Vengeance DDR5 16GB 5600MHz",
        price: "₹5,180",
        oldPrice: "₹10,350",

        availableAt: ["Amazon", "Flipkart", "Corsair Store"],
        lowestPrice: "₹5000",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEP8lJncmLFjCCYuTVT5-oduks42rW6BlVtg&s",
        specs: {
            Speed: "5600MHz",
            CASLatency: "CL40",
            Voltage: "1.25V",
            FormFactor: "UDIMM",
            Compatibility: "Intel & AMD DDR5 platforms",
        },
        description: "Corsair’s Vengeance DDR5 delivers next-gen speed and stability for multitasking, gaming, and content creation. Ideal for high-performance builds."
    },
    {
        id: "samsung-t7-500gb",
        product_type: "Storage",
        product_link: "https://www.amazon.in/Samsung-10Gbps-External-Portable-MU-PC1T0T/dp/B087DFLF9S/ref=sr_1_2_sspa?crid=33K7UCURFHBIK&dib=eyJ2IjoiMSJ9.blQelJwHQcHdaT4npzXg-Nmku3ylF3gBQ_V9tHaE2a_kwgUNjg9H1sQ3pN5ZViit5yVsycGEaw3luBom631juQbosmssczYEKuAXe1UcrRJdpVlpUykME-lkUCXQHZjUjdNTYHjxUB7uix_uLYPQ6VQncYwvewY9cE1a79U3yWuIJADrpd6zKcLir4lEO2gysu8MwWLMfFRkZwESI6Ki02jwl6qyVx6qd8EkOah5Cro.7epUacD_1FjOEEpHx6Pog5h-9BIjdryfV4r7qR-ptXI&dib_tag=se&keywords=samsung-t7-500gb&nsdOptOutParam=true&qid=1757596805&sprefix=samsung-t7-500gb%2Caps%2C440&sr=8-2-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1",
        name: "Samsung T7 Portable SSD 500GB",
        price: "₹9,899",
        oldPrice: "₹23,999",

        availableAt: ["Amazon", "Vlebazaar", "Samsung Store"],
        lowestPrice: "₹12999",
        image: "https://m.media-amazon.com/images/I/81rZdT4FlJL.jpg",
        specs: {
            Interface: "USB 3.2 Gen2",
            ReadSpeed: "1050MB/s",
            WriteSpeed: "1000MB/s",
            Encryption: "AES 256-bit",
            Compatibility: "Windows, macOS, Android, PS5",
        },
        description: "The Samsung T7 is a compact, shock-resistant SSD with blazing speeds and hardware encryption—perfect for creators, gamers, and professionals on the go."
    },
    







];

export default products;