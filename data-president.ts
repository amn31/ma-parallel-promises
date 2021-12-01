

export function getInfoPresident (element: any)  {
    return new Promise<any>((resolve, reject) => {
        setTimeout (() => {
            resolve(database.find(x => x.President == element.name))
        },Math.random()*10)
        
        //resolve({name: element.President, quit: element['Left office'], start:element['Took office'] })
    });
}

const database = [
    {
      "Presidency": 1,
      "President": "George Washington",
      "Wikipedia Entry": "http://en.wikipedia.org/wiki/George_Washington",
      "Took office": "30/04/1789",
      "Left office": "4/03/1797",
      "Party": "Independent ",
      "Portrait": "GeorgeWashington.jpg",
      "Thumbnail": "thmb_GeorgeWashington.jpg",
      "Home State": "Virginia"
    },
    {
      "Presidency": 2,
      "President": "John Adams",
      "Wikipedia Entry": "http://en.wikipedia.org/wiki/John_Adams",
      "Took office": "4/03/1797",
      "Left office": "4/03/1801",
      "Party": "Federalist ",
      "Portrait": "JohnAdams.jpg",
      "Thumbnail": "thmb_JohnAdams.jpg",
      "Home State": "Massachusetts"
    },
    {
      "Presidency": 3,
      "President": "Thomas Jefferson",
      "Wikipedia Entry": "http://en.wikipedia.org/wiki/Thomas_Jefferson",
      "Took office": "4/03/1801",
      "Left office": "4/03/1809",
      "Party": "Democratic-Republican ",
      "Portrait": "Thomasjefferson.gif",
      "Thumbnail": "thmb_Thomasjefferson.gif",
      "Home State": "Virginia"
    },
    {
      "Presidency": 4,
      "President": "James Madison",
      "Wikipedia Entry": "http://en.wikipedia.org/wiki/James_Madison",
      "Took office": "4/03/1809",
      "Left office": "4/03/1817",
      "Party": "Democratic-Republican ",
      "Portrait": "JamesMadison.gif",
      "Thumbnail": "thmb_JamesMadison.gif",
      "Home State": "Virginia"
    },
    {
      "Presidency": 5,
      "President": "James Monroe",
      "Wikipedia Entry": "http://en.wikipedia.org/wiki/James_Monroe",
      "Took office": "4/03/1817",
      "Left office": "4/03/1825",
      "Party": "Democratic-Republican ",
      "Portrait": "JamesMonroe.gif",
      "Thumbnail": "thmb_JamesMonroe.gif",
      "Home State": "Virginia"
    },
    {
      "Presidency": 6,
      "President": "John Quincy Adams",
      "Wikipedia Entry": "http://en.wikipedia.org/wiki/John_Quincy_Adams",
      "Took office": "4/03/1825",
      "Left office": "4/03/1829",
      "Party": "Democratic-Republican/National Republican ",
      "Portrait": "JohnQuincyAdams.gif",
      "Thumbnail": "thmb_JohnQuincyAdams.gif",
      "Home State": "Massachusetts"
    },
    {
      "Presidency": 7,
      "President": "Andrew Jackson",
      "Wikipedia Entry": "http://en.wikipedia.org/wiki/Andrew_Jackson",
      "Took office": "4/03/1829",
      "Left office": "4/03/1837",
      "Party": "Democratic ",
      "Portrait": "Andrew_jackson_head.gif",
      "Thumbnail": "thmb_Andrew_jackson_head.gif",
      "Home State": "Tennessee"
    },
    {
      "Presidency": 8,
      "President": "Martin Van Buren",
      "Wikipedia Entry": "http://en.wikipedia.org/wiki/Martin_Van_Buren",
      "Took office": "4/03/1837",
      "Left office": "4/03/1841",
      "Party": "Democratic ",
      "Portrait": "MartinVanBuren.gif",
      "Thumbnail": "thmb_MartinVanBuren.gif",
      "Home State": "New York"
    },
    {
      "Presidency": 9,
      "President": "William Henry Harrison",
      "Wikipedia Entry": "http://en.wikipedia.org/wiki/William_Henry_Harrison",
      "Took office": "4/03/1841",
      "Left office": "4/04/1841",
      "Party": "Whig",
      "Portrait": "WilliamHenryHarrison.gif",
      "Thumbnail": "thmb_WilliamHenryHarrison.gif",
      "Home State": "Ohio"
    },
    {
      "Presidency": 10,
      "President": "John Tyler",
      "Wikipedia Entry": "http://en.wikipedia.org/wiki/John_Tyler",
      "Took office": "4/04/1841",
      "Left office": "4/03/1845",
      "Party": "Whig",
      "Portrait": "JohnTyler.jpg",
      "Thumbnail": "thmb_JohnTyler.jpg",
      "Home State": "Virginia"
    },
    {
      "Presidency": 11,
      "President": "James K. Polk",
      "Wikipedia Entry": "http://en.wikipedia.org/wiki/James_K._Polk",
      "Took office": "4/03/1845",
      "Left office": "4/03/1849",
      "Party": "Democratic ",
      "Portrait": "JamesKPolk.gif",
      "Thumbnail": "thmb_JamesKPolk.gif",
      "Home State": "Tennessee"
    },
    {
      "Presidency": 12,
      "President": "Zachary Taylor",
      "Wikipedia Entry": "http://en.wikipedia.org/wiki/Zachary_Taylor",
      "Took office": "4/03/1849",
      "Left office": "9/07/1850",
      "Party": "Whig",
      "Portrait": "ZacharyTaylor.jpg",
      "Thumbnail": "thmb_ZacharyTaylor.jpg",
      "Home State": "Louisiana"
    },
    {
      "Presidency": 13,
      "President": "Millard Fillmore",
      "Wikipedia Entry": "http://en.wikipedia.org/wiki/Millard_Fillmore",
      "Took office": "9/07/1850",
      "Left office": "4/03/1853",
      "Party": "Whig",
      "Portrait": "MillardFillmore.png",
      "Thumbnail": "thmb_MillardFillmore.png",
      "Home State": "New York"
    },
    {
      "Presidency": 14,
      "President": "Franklin Pierce",
      "Wikipedia Entry": "http://en.wikipedia.org/wiki/Franklin_Pierce",
      "Took office": "4/03/1853",
      "Left office": "4/03/1857",
      "Party": "Democratic ",
      "Portrait": "FranklinPierce.gif",
      "Thumbnail": "thmb_FranklinPierce.gif",
      "Home State": "New Hampshire"
    },
    {
      "Presidency": 15,
      "President": "James Buchanan",
      "Wikipedia Entry": "http://en.wikipedia.org/wiki/James_Buchanan",
      "Took office": "4/03/1857",
      "Left office": "4/03/1861",
      "Party": "Democratic ",
      "Portrait": "JamesBuchanan.gif",
      "Thumbnail": "thmb_JamesBuchanan.gif",
      "Home State": "Pennsylvania"
    },
    {
      "Presidency": 16,
      "President": "Abraham Lincoln",
      "Wikipedia Entry": "http://en.wikipedia.org/wiki/Abraham_Lincoln",
      "Took office": "4/03/1861",
      "Left office": "15/04/1865",
      "Party": "Republican/National Union",
      "Portrait": "AbrahamLincoln.jpg",
      "Thumbnail": "thmb_AbrahamLincoln.jpg",
      "Home State": "Illinois"
    },
    {
      "Presidency": 17,
      "President": "Andrew Johnson",
      "Wikipedia Entry": "http://en.wikipedia.org/wiki/Andrew_Johnson",
      "Took office": "15/04/1865",
      "Left office": "4/03/1869",
      "Party": "Democratic/National Union",
      "Portrait": "AndrewJohnson.gif",
      "Thumbnail": "thmb_AndrewJohnson.gif",
      "Home State": "Tennessee"
    },
    {
      "Presidency": 18,
      "President": "Ulysses S. Grant",
      "Wikipedia Entry": "http://en.wikipedia.org/wiki/Ulysses_S._Grant",
      "Took office": "4/03/1869",
      "Left office": "4/03/1877",
      "Party": "Republican ",
      "Portrait": "UlyssesSGrant.gif",
      "Thumbnail": "thmb_UlyssesSGrant.gif",
      "Home State": "Ohio"
    },
    {
      "Presidency": 19,
      "President": "Rutherford B. Hayes",
      "Wikipedia Entry": "http://en.wikipedia.org/wiki/Rutherford_B._Hayes",
      "Took office": "4/03/1877",
      "Left office": "4/03/1881",
      "Party": "Republican ",
      "Portrait": "RutherfordBHayes.png",
      "Thumbnail": "thmb_RutherfordBHayes.png",
      "Home State": "Ohio"
    },
    {
      "Presidency": 20,
      "President": "James A. Garfield",
      "Wikipedia Entry": "http://en.wikipedia.org/wiki/James_A._Garfield",
      "Took office": "4/03/1881",
      "Left office": "19/09/1881",
      "Party": "Republican ",
      "Portrait": "James_Garfield.jpg",
      "Thumbnail": "thmb_James_Garfield.jpg",
      "Home State": "Ohio"
    },
    {
      "Presidency": 21,
      "President": "Chester A. Arthur",
      "Wikipedia Entry": "http://en.wikipedia.org/wiki/Chester_A._Arthur",
      "Took office": "19/09/1881",
      "Left office": "4/03/1885",
      "Party": "Republican ",
      "Portrait": "ChesterAArthur.gif",
      "Thumbnail": "thmb_ChesterAArthur.gif",
      "Home State": "New York"
    },
    {
      "Presidency": 22,
      "President": "Grover Cleveland",
      "Wikipedia Entry": "http://en.wikipedia.org/wiki/Grover_Cleveland",
      "Took office": "4/03/1885",
      "Left office": "4/03/1889",
      "Party": "Democratic ",
      "Portrait": "Grover_Cleveland_2.jpg",
      "Thumbnail": "thmb_Grover_Cleveland_2.jpg",
      "Home State": "New York"
    },
    {
      "Presidency": 23,
      "President": "Benjamin Harrison",
      "Wikipedia Entry": "http://en.wikipedia.org/wiki/Benjamin_Harrison",
      "Took office": "4/03/1889",
      "Left office": "4/03/1893",
      "Party": "Republican ",
      "Portrait": "BenjaminHarrison.gif",
      "Thumbnail": "thmb_BenjaminHarrison.gif",
      "Home State": "Indiana"
    },
    {
      "Presidency": 24,
      "President": "Grover Cleveland (2nd term)",
      "Wikipedia Entry": "http://en.wikipedia.org/wiki/Grover_Cleveland",
      "Took office": "4/03/1893",
      "Left office": "4/03/1897",
      "Party": "Democratic ",
      "Portrait": "Grover_Cleveland.jpg",
      "Thumbnail": "thmb_Grover_Cleveland.jpg",
      "Home State": "New York"
    },
    {
      "Presidency": 25,
      "President": "William McKinley",
      "Wikipedia Entry": "http://en.wikipedia.org/wiki/William_McKinley",
      "Took office": "4/03/1897",
      "Left office": "14/9/1901",
      "Party": "Republican ",
      "Portrait": "WilliamMcKinley.gif",
      "Thumbnail": "thmb_WilliamMcKinley.gif",
      "Home State": "Ohio"
    },
    {
      "Presidency": 26,
      "President": "Theodore Roosevelt",
      "Wikipedia Entry": "http://en.wikipedia.org/wiki/Theodore_Roosevelt",
      "Took office": "14/9/1901",
      "Left office": "4/3/1909",
      "Party": "Republican ",
      "Portrait": "TheodoreRoosevelt.jpg",
      "Thumbnail": "thmb_TheodoreRoosevelt.jpg",
      "Home State": "New York"
    },
    {
      "Presidency": 27,
      "President": "William Howard Taft",
      "Wikipedia Entry": "http://en.wikipedia.org/wiki/William_Howard_Taft",
      "Took office": "4/3/1909",
      "Left office": "4/03/1913",
      "Party": "Republican ",
      "Portrait": "WilliamHowardTaft.jpg",
      "Thumbnail": "thmb_WilliamHowardTaft.jpg",
      "Home State": "Ohio"
    },
    {
      "Presidency": 28,
      "President": "Woodrow Wilson",
      "Wikipedia Entry": "http://en.wikipedia.org/wiki/Woodrow_Wilson",
      "Took office": "4/03/1913",
      "Left office": "4/03/1921",
      "Party": "Democratic ",
      "Portrait": "WoodrowWilson.gif",
      "Thumbnail": "thmb_WoodrowWilson.gif",
      "Home State": "New Jersey"
    },
    {
      "Presidency": 29,
      "President": "Warren G. Harding",
      "Wikipedia Entry": "http://en.wikipedia.org/wiki/Warren_G._Harding",
      "Took office": "4/03/1921",
      "Left office": "2/8/1923",
      "Party": "Republican ",
      "Portrait": "WarrenGHarding.gif",
      "Thumbnail": "thmb_WarrenGHarding.gif",
      "Home State": "Ohio"
    },
    {
      "Presidency": 30,
      "President": "Calvin Coolidge",
      "Wikipedia Entry": "http://en.wikipedia.org/wiki/Calvin_Coolidge",
      "Took office": "2/8/1923",
      "Left office": "4/03/1929",
      "Party": "Republican ",
      "Portrait": "CoolidgeWHPortrait.gif",
      "Thumbnail": "thmb_CoolidgeWHPortrait.gif",
      "Home State": "Massachusetts"
    },
    {
      "Presidency": 31,
      "President": "Herbert Hoover",
      "Wikipedia Entry": "http://en.wikipedia.org/wiki/Herbert_Hoover",
      "Took office": "4/03/1929",
      "Left office": "4/03/1933",
      "Party": "Republican ",
      "Portrait": "HerbertHover.gif",
      "Thumbnail": "thmb_HerbertHover.gif",
      "Home State": "Iowa"
    },
    {
      "Presidency": 32,
      "President": "Franklin D. Roosevelt",
      "Wikipedia Entry": "http://en.wikipedia.org/wiki/Franklin_D._Roosevelt",
      "Took office": "4/03/1933",
      "Left office": "12/4/1945",
      "Party": "Democratic",
      "Portrait": "FranklinDRoosevelt.gif",
      "Thumbnail": "thmb_FranklinDRoosevelt.gif",
      "Home State": "New York"
    },
    {
      "Presidency": 33,
      "President": "Harry S. Truman",
      "Wikipedia Entry": "http://en.wikipedia.org/wiki/Harry_S._Truman",
      "Took office": "12/4/1945",
      "Left office": "20/01/1953",
      "Party": "Democratic",
      "Portrait": "HarryTruman.jpg",
      "Thumbnail": "thmb_HarryTruman.jpg",
      "Home State": "Missouri"
    },
    {
      "Presidency": 34,
      "President": "Dwight D. Eisenhower",
      "Wikipedia Entry": "http://en.wikipedia.org/wiki/Dwight_D._Eisenhower",
      "Took office": "20/01/1953",
      "Left office": "20/01/1961",
      "Party": "Republican ",
      "Portrait": "Dwight_D_Eisenhower.jpg",
      "Thumbnail": "thmb_Dwight_D_Eisenhower.jpg",
      "Home State": "Texas"
    },
    {
      "Presidency": 35,
      "President": "John F. Kennedy",
      "Wikipedia Entry": "http://en.wikipedia.org/wiki/John_F._Kennedy",
      "Took office": "20/01/1961",
      "Left office": "22/11/1963",
      "Party": "Democratic",
      "Portrait": "John_F_Kennedy.jpg",
      "Thumbnail": "thmb_John_F_Kennedy.jpg",
      "Home State": "Massachusetts"
    },
    {
      "Presidency": 36,
      "President": "Lyndon B. Johnson",
      "Wikipedia Entry": "http://en.wikipedia.org/wiki/Lyndon_B._Johnson",
      "Took office": "22/11/1963",
      "Left office": "20/1/1969",
      "Party": "Democratic",
      "Portrait": "Lyndon_B_Johnson.gif",
      "Thumbnail": "thmb_Lyndon_B_Johnson.gif",
      "Home State": "Texas"
    },
    {
      "Presidency": 37,
      "President": "Richard Nixon",
      "Wikipedia Entry": "http://en.wikipedia.org/wiki/Richard_Nixon",
      "Took office": "20/1/1969",
      "Left office": "9/8/1974",
      "Party": "Republican",
      "Portrait": "RichardNixon.gif",
      "Thumbnail": "thmb_RichardNixon.gif",
      "Home State": "California"
    },
    {
      "Presidency": 38,
      "President": "Gerald Ford",
      "Wikipedia Entry": "http://en.wikipedia.org/wiki/Gerald_Ford",
      "Took office": "9/8/1974",
      "Left office": "20/01/1977",
      "Party": "Republican",
      "Portrait": "Gerald_R_Ford.jpg",
      "Thumbnail": "thmb_Gerald_R_Ford.jpg",
      "Home State": "Michigan"
    },
    {
      "Presidency": 39,
      "President": "Jimmy Carter",
      "Wikipedia Entry": "http://en.wikipedia.org/wiki/Jimmy_Carter",
      "Took office": "20/01/1977",
      "Left office": "20/01/1981",
      "Party": "Democratic ",
      "Portrait": "James_E_Carter.gif",
      "Thumbnail": "thmb_James_E_Carter.gif",
      "Home State": "Georgia"
    },
    {
      "Presidency": 40,
      "President": "Ronald Reagan",
      "Wikipedia Entry": "http://en.wikipedia.org/wiki/Ronald_Reagan",
      "Took office": "20/01/1981",
      "Left office": "20/01/1989",
      "Party": "Republican ",
      "Portrait": "ReaganWH.jpg",
      "Thumbnail": "thmb_ReaganWH.jpg",
      "Home State": "California"
    },
    {
      "Presidency": 41,
      "President": "George H. W. Bush",
      "Wikipedia Entry": "http://en.wikipedia.org/wiki/George_H._W._Bush",
      "Took office": "20/01/1989",
      "Left office": "20/01/1993",
      "Party": "Republican ",
      "Portrait": "George_H_W_Bush.gif",
      "Thumbnail": "thmb_George_H_W_Bush.gif",
      "Home State": "Texas"
    },
    {
      "Presidency": 42,
      "President": "Bill Clinton",
      "Wikipedia Entry": "http://en.wikipedia.org/wiki/Bill_Clinton",
      "Took office": "20/01/1993",
      "Left office": "20/01/2001",
      "Party": "Democratic ",
      "Portrait": "Clinton.jpg",
      "Thumbnail": "thmb_Clinton.jpg",
      "Home State": "Arkansas"
    },
    {
      "Presidency": 43,
      "President": "George W. Bush",
      "Wikipedia Entry": "http://en.wikipedia.org/wiki/George_W._Bush",
      "Took office": "20/01/2001",
      "Left office": "20/01/2009",
      "Party": "Republican ",
      "Portrait": "George_W_Bush.jpg",
      "Thumbnail": "thmb_George_W_Bush.jpg",
      "Home State": "Texas"
    },
    {
      "Presidency": 44,
      "President": "Barack Obama",
      "Wikipedia Entry": "http://en.wikipedia.org/wiki/Barack_Obama",
      "Took office": "20/01/2009",
      "Left office": "Incumbent ",
      "Party": "  Democratic   ",
      "Portrait": "Barack_Obama.jpg",
      "Thumbnail": "thmb_Barack_Obama.jpg",
      "Home State": "Illinois"
    }
   ]

   export const Presidents = database.map(x => {return {party: x.Party,name:x.President}}) 