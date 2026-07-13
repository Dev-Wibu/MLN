export const classData = [
  { mssv: "CE161131", name: "Nguyễn Kiên Cường" },
  { mssv: "HE171047", name: "Trần Bá Thành" },
  { mssv: "SA180252", name: "Nguyễn Ngọc Duy" },
  { mssv: "SE150831", name: "Đỗ Thái Gia Khang" },
  { mssv: "SE160225", name: "Nguyễn Minh Đức" },
  { mssv: "SE160645", name: "Nguyễn Viết Khải Hoàn" },
  { mssv: "SE161705", name: "Nguyễn Thủy Biển" },
  { mssv: "SE170097", name: "Nguyễn Thị Trà My" },
  { mssv: "SE171275", name: "Phạm Đức Tài Lộc" },
  { mssv: "SE173106", name: "Trần Quốc Phú" },
  { mssv: "SE173473", name: "Hoàng Bá Văn" },
  { mssv: "SE180722", name: "Hoàng Văn Huy" },
  { mssv: "SE181521", name: "Hà Hải Cường" },
  { mssv: "SE181723", name: "Võ Xuân Lĩnh" },
  { mssv: "SE182019", name: "Trần Việt Anh" },
  { mssv: "SE182115", name: "Lê Quang Vinh" },
  { mssv: "SE182131", name: "Trương Minh Khánh" },
  { mssv: "SE182429", name: "Huỳnh Hoàng Long" },
  { mssv: "SE182510", name: "Trương Trọng Phúc" },
  { mssv: "SE183228", name: "Nguyễn Cơ Hiếu" },
  { mssv: "SE183711", name: "Trần Ngọc Anh" },
  { mssv: "SE184031", name: "Quách Hữu Khang" },
  { mssv: "SE184055", name: "Trần Nhật Tân" },
  { mssv: "SE184261", name: "Nguyễn Phạm Thu Hà" },
  { mssv: "SE184518", name: "Lê Hồ Gia Bảo" },
  { mssv: "SE184790", name: "Bùi Hoàng Hải" },
  { mssv: "SE193632", name: "Nguyễn Văn Thành" },
  { mssv: "SS160137", name: "Huỳnh Mạnh" },
  { mssv: "SS170888", name: "Trương Ngọc Hân" },
  { mssv: "SS180693", name: "Phạm Quốc Hưng" },
  { mssv: "SS181240", name: "Hoàng Thị Thuỳ Linh" }
];

export const checkValidMSSV = (mssvInput) => {
  return classData.find(student => student.mssv.toUpperCase() === mssvInput.toUpperCase());
};
