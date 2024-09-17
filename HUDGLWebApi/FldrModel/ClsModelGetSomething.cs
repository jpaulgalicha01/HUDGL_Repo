namespace HUDGLWebApi.FldrModel
{

    public class ClsModelCustomer
    {
        public string? ControlNo { get; set; }
        public string? CustName { get; set; }
    }

    public class ClsModelWarehouse
    {
        public string? WHCode { get; set; }
        public string? WHDesc { get; set; }
    }

    public class ClsModelProducts
    {
        public string? StockNumber { get; set; }
        public string? StockCode { get; set; }
        public string? BrandName { get; set; }
        public string? StockDesc { get; set; }
    }

    public class ClsModelProductsDetails
    {
        public double? plvarib { get; set; }
        public double? plvarpiece { get; set; }
        public double? plvarUCost { get; set; }
        public string? plsvarUMCS { get; set; }
        public string? plsvarUMIB { get; set; }
        public string? plsvarUMPC { get; set; }
        public double? plsvarVC { get; set; }
        public bool? plsvarVatSetup { get; set; }
        public double? plvarSPPC { get; set; }
        public double? plvarSPPP { get; set; }
        public double? plvarSPPI { get; set; }

        public List<ClsModelUM>? ClsModelUM { get; set; }

    }


    public class ClsModelUM
    {
        public string? um1 { get; set; }
        public string? um2 { get; set; }
    }

    public class ClsModelPA
    {
        public string? PA { get; set; }
        public string? AT { get; set; }
    }

    public class ClsModelSalesman
    {
        public string? SMCode { get; set; }
        public string? SMDesc { get; set; }
        
    }
    public class ClsModelDivision
    {
        public string? DivisionCode { get; set; }
        public string? DivisionDesc { get; set; }
    }


}
