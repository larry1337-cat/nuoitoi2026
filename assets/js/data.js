var siteConfig = {
    qrImage: "https://i.imgur.com/ZmWzIk0.jpeg",
    bankLogo: "https://upload.wikimedia.org/wikipedia/commons/2/25/Logo_MB_new.png",
    accountNumber: "1999991503",
    accountDisplay: "1999.99.1503",
    accountOwner: "NGUYEN TAN LOC"
};

var goal = 1000000;

var seedData = [
    { name: "VND-TGTT-NGO MINH HIEU - 19045627123019", amount: 2000,  msg: "Cho mua mi tom FT25350103112787 Ma giao dich Trace161414 Trace 161414", fixedHour: 10, fixedMin: 14, type: 'receive', baseDayOffset: 0 },
    { name: "DANG CAO BO",                              amount: 36018, msg: "DANG CAO BO chuyen tien",                                                  fixedHour: 9,  fixedMin: 9,  type: 'receive', baseDayOffset: 0 },
    { name: "TRAN HA LINH (Tap hoa co Linh)",           amount: 12000, msg: "Mua 2 goi Bim Bim",                                                        fixedHour: 15, fixedMin: 32, type: 'spend',   baseDayOffset: 0 },
    { name: "LE VAN BAO",                               amount: 2000,  msg: "Con co 2k thui",                                                           fixedHour: 12, fixedMin: 14, type: 'receive', baseDayOffset: 0 },
    { name: "TONG QUANG LAM",                           amount: 3000,  msg: "Cua it long vong",                                                         fixedHour: 10, fixedMin: 47, type: 'receive', baseDayOffset: 0 },
    { name: "HA ANH TUAN (Quan tap hoa)",               amount: 10000, msg: "Mua chai nuoc suoi",                                                       fixedHour: 20, fixedMin: 3,  type: 'spend',   baseDayOffset: 1 },
    { name: "PHUNG KHANH LINH",                        amount: 50000, msg: "PHUNG KHANH LINH chuyen khoan",                                            fixedHour: 14, fixedMin: 21, type: 'receive', baseDayOffset: 1 },
    { name: "TONG MY LINH (Quan com tam)",              amount: 35000, msg: "An com suon",                                                              fixedHour: 11, fixedMin: 38, type: 'spend',   baseDayOffset: 2 },
    { name: "PHUNG THANH DO (anh trai say hai)",        amount: 45000, msg: "Mua banh mi nha th e",                                                     fixedHour: 7,  fixedMin: 12, type: 'receive', baseDayOffset: 2 },
    { name: "TRUONG TUAN TU",                           amount: 10000, msg: "TRUONG TUAN TU chuyen tien",                                               fixedHour: 16, fixedMin: 9,  type: 'receive', baseDayOffset: 3 },
    { name: "VU DINH TRONG THANG (hoan ho band nhac thu do)", amount: 99999, msg: "Cho tien dong tien hoc ne e",                                        fixedHour: 8,  fixedMin: 4,  type: 'receive', baseDayOffset: 3 }
];

var liveEvents = [
    { delay: 15000, name: "VUONG THI HUYEN (hen ho nhung khong yeu)", amount: 15000, msg: "tui nui loc het cai dai hoc", type: 'receive' },
    { delay: 45000, name: "VIETTEL TELECOM (Nap tien DT)", amount: 50000, msg: "Gia han goi 4G thang", type: 'spend' }
];
