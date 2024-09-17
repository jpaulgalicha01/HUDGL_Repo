namespace HUDGLWebApi.FldrModel
{
    public class ClsModelTblMain1
    {
        public string? IC { get; set; }
        public string? DocNum { get; set; }
        public string? Voucher { get; set; }
        public string? UserCode { get; set; }
        public string? ControlNo { get; set; }
        public DateTime? TDate { get; set; }
        public DateTime? VDate { get; set; }
        public string? Reference { get; set; }
        public int? Term { get; set; }
        public string? Remarks { get; set; }
        public string? CheckNo { get; set; }
        public double? CAmount { get; set; }
        public string? ASMCode { get; set; }
        public DateTime? DE { get; set; }
        public string? CNCode { get; set; }
        public string? DivisionCode { get; set; }
        public double? TotalDisct { get; set; }
        public double? TotalPDisct { get; set; }
        public List<ClsModelTblMain2>? ModelTblMain2 { get; set; }
        public List<ClsModelTblMain3>? ModelTblMain3 { get; set; }

    }

    public class ClsModelTblMain2
    {
        public string? IC { get; set; }
        public string? StockNumber { get; set; }
        public double? PIn { get; set; }
        public double? POut { get; set; }
        public double? UP { get; set; }
        public double? Cost { get; set; }
        public double? ActDisct { get; set; }
        public double? PDisct { get; set; }
        public double? VAT { get; set; }
        public string? UM { get; set; }
        public int? RowNum { get; set; }
        public double? D1 { get; set; }
        public double? D2 { get; set; }
        public double? D3 { get; set; }
        public string? WHCode { get; set; }
        public string? BatchNo { get; set; } 
        public DateTime? ExpDate { get; set; }
    }

    public class ClsModelTblMain3
    {
        public string? IC { get; set; }
        public string? PA { get; set; }
        public string? Refer { get; set; }
        public double? Debit { get; set; }
        public double? Credit { get; set; }
        public string? SIT { get; set; }
        public int? RowNum { get; set; }
        public string? DivisionCode { get; set; }
    }
}
