using HUDGLWebApi.FldrClass;
using HUDGLWebApi.FldrModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.SqlServer.Server;
using System.Data.Common;
using static HUDGLWebApi.FldrModel.ClsModelSalesman;

namespace HUDGLWebApi.Controllers
{
    [ApiController]
    public class GetSomething : Controller
    {
        SqlConnection myconnection;
        SqlCommand? mycommand;
        SqlDataReader? dr;

        [HttpGet]
        [Route("API/WebAPI/GetAutoNum")]
        public async Task<string> GetAutoNum(string strVoucher, string strCnCode)
        {

            return await new ClsAutoNum().GetVoucherAutoNum(strVoucher, strCnCode);
        }
        

        [HttpGet]
        [Route("API/WebAPI/GetCustomerName")]
        [Authorize]
        public IEnumerable<ClsModelCustomer> GetCustomerName(string strNtype, string strCNCode)
        {
            List< ClsModelCustomer> MSSQLClsModelCustomer = new List<ClsModelCustomer>();
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();

            mycommand = new SqlCommand($"SELECT ControlNo,CustName FROM tblCustomer WHERE NType = '{strNtype}' AND Active = 1 AND CNCode = '{strCNCode}' ORDER by CustName ", myconnection);
            dr = mycommand.ExecuteReader();
            while (dr.Read()) 
            {
                ClsModelCustomer ClsModelCustomer1 = new ClsModelCustomer
                {
                    ControlNo = dr["ControlNo"].ToString(),
                    CustName = dr["CustName"].ToString(),
                };
                MSSQLClsModelCustomer.Add(ClsModelCustomer1);
            }
            dr.Close();
            myconnection.Close();
            return MSSQLClsModelCustomer;

        }

        [HttpGet]
        [Route("API/WebAPI/GetWarehouse")]
        [Authorize]
        public IEnumerable<ClsModelWarehouse> GetWarehouse()
        {
            List< ClsModelWarehouse> MSSQLClsModelWarehouse = new List<ClsModelWarehouse>();
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();

            mycommand = new SqlCommand($"SELECT WHCode, WHDesc FROM tblWarehouse  ORDER by WHDesc", myconnection);
            dr = mycommand.ExecuteReader();
            while (dr.Read()) {

                ClsModelWarehouse ClsModelWarehouse1 = new ClsModelWarehouse
                {
                    WHCode = dr["WHCode"].ToString(),
                    WHDesc = dr["WHDesc"].ToString(),
                };
                MSSQLClsModelWarehouse.Add(ClsModelWarehouse1);
            }
            dr.Close();
            myconnection.Close();
            return MSSQLClsModelWarehouse;
        }


        [HttpGet]
        [Route("API/WebAPI/GetProducts")]
        [Authorize]
        public List<ClsModelProducts> GetProducts()
        {
            List<ClsModelProducts> MSSQLClsModelProducts = new List<ClsModelProducts>();
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();

            mycommand = new SqlCommand("SELECT StockNumber , StockCode, StockDesc,BrandName FROM tblStocks  WHERE Active = 1 ORDER by StockNumber", myconnection);
            dr= mycommand.ExecuteReader();
            while (dr.Read()) 
            {
                ClsModelProducts ClsModelProducts1 = new ClsModelProducts
                {
                    StockNumber = dr["StockNumber"].ToString(),
                    StockCode = dr["StockCode"].ToString(),
                    BrandName = dr["BrandName"].ToString(),
                    StockDesc = dr["StockDesc"].ToString(),
                };

                MSSQLClsModelProducts.Add(ClsModelProducts1);
            }
            dr.Close();
            myconnection.Close();
            return MSSQLClsModelProducts;
        }

        [HttpGet]
        [Route("API/WebAPI/GetProductsDetails")]
        [Authorize]
        public  List<ClsModelProductsDetails> GetProductsDetails(string strStockNumber, string strSPO)
        {
            double varplvarSPPC, varplvarSPPI, varplvarSPPP;
            List<ClsModelProductsDetails> MSSQLClsModelProductsDetails = new List<ClsModelProductsDetails>();
            myconnection = new SqlConnection( new ClsGetConnection().PlsConnect()); 
            myconnection.Open();

            mycommand = new SqlCommand($"Select *  FROM tblStocks WHERE StockNumber=@_StockNumber", myconnection);
            mycommand.Parameters.AddWithValue("_StockNumber", strStockNumber);
            dr = mycommand.ExecuteReader();
            dr.Read();
            if (strSPO == "01")
            {

                varplvarSPPC = double.Parse(dr["SPPC1"].ToString());
                varplvarSPPI = double.Parse(dr["SPPI1"].ToString());
                varplvarSPPP = double.Parse(dr["SPPP1"].ToString());
               
            }
            else if (strSPO == "02")
            {
                varplvarSPPC = double.Parse(dr["SPPC2"].ToString());
                varplvarSPPI = double.Parse(dr["SPPI2"].ToString());
                varplvarSPPP = double.Parse(dr["SPPP2"].ToString());
            }
            else if (strSPO == "03")
            {
                varplvarSPPC = double.Parse(dr["SPPC3"].ToString());
                varplvarSPPI = double.Parse(dr["SPPI3"].ToString());
                varplvarSPPP = double.Parse(dr["SPPP3"].ToString());
            }
            else if (strSPO == "04")
            {
                varplvarSPPC = double.Parse(dr["SPPC4"].ToString());
                varplvarSPPI = double.Parse(dr["SPPI4"].ToString());
                varplvarSPPP = double.Parse(dr["SPPP4"].ToString());
            }
            else if (strSPO == "05")
            {
                varplvarSPPC = double.Parse(dr["SPPC5"].ToString());
                varplvarSPPI = double.Parse(dr["SPPI5"].ToString());
                varplvarSPPP = double.Parse(dr["SPPP5"].ToString());
            }
            else if (strSPO == "06")
            {
                varplvarSPPC = double.Parse(dr["SPPC6"].ToString());
                varplvarSPPI = double.Parse(dr["SPPI6"].ToString());
                varplvarSPPP = double.Parse(dr["SPPP6"].ToString());
            }
            else if (strSPO == "07")
            {
                varplvarSPPC = double.Parse(dr["SPPC7"].ToString());
                varplvarSPPI = double.Parse(dr["SPPI7"].ToString());
                varplvarSPPP = double.Parse(dr["SPPP7"].ToString());
            }
            else if (strSPO == "08")
            {
                varplvarSPPC = double.Parse(dr["SPPC8"].ToString());
                varplvarSPPI = double.Parse(dr["SPPI8"].ToString());
                varplvarSPPP = double.Parse(dr["SPPP8"].ToString());
            }
            else if (strSPO == "09")
            {
                varplvarSPPC = double.Parse(dr["SPPC9"].ToString());
                varplvarSPPI = double.Parse(dr["SPPI9"].ToString());
                varplvarSPPP = double.Parse(dr["SPPP9"].ToString());
            }
            else if (strSPO == "10")
            {
                varplvarSPPC = double.Parse(dr["SPPC10"].ToString());
                varplvarSPPI = double.Parse(dr["SPPI10"].ToString());
                varplvarSPPP = double.Parse(dr["SPPP10"].ToString());
            }
            else
            {
                varplvarSPPC = double.Parse(dr["SPPC1"].ToString());
                varplvarSPPI = double.Parse(dr["SPPI1"].ToString());
                varplvarSPPP = double.Parse(dr["SPPP1"].ToString());
            }

            ClsModelProductsDetails ClsModelProductsDetails1 = new ClsModelProductsDetails
            {
                plvarib = double.Parse(dr["IB"].ToString()),
                plvarpiece = double.Parse(dr["Piece"].ToString()),
                plvarUCost = double.Parse(dr["UCost"].ToString()),
                plsvarUMCS = dr["UMCS"].ToString(),
                plsvarUMIB = dr["UMIB"].ToString(),
                plsvarUMPC = dr["UMPC"].ToString(),
                plsvarVC = double.Parse(dr["VC"].ToString()),
                plsvarVatSetup = bool.Parse(dr["VatSetup"].ToString()),
                plvarSPPC = varplvarSPPC,
                plvarSPPP = varplvarSPPP,
                plvarSPPI = varplvarSPPI,
                ClsModelUM = new ClsGetSomething().GetUm(int.Parse(dr["IB"].ToString()), dr["UMCS"].ToString(), dr["UMIB"].ToString(), dr["UMPC"].ToString())
            };
            MSSQLClsModelProductsDetails.Add(ClsModelProductsDetails1);


            dr.Close();
            myconnection.Close();
            return MSSQLClsModelProductsDetails;
        }


        [HttpGet]
        [Route("API/WebAPI/GetVATRate")]
        [Authorize]
        public async Task<double> GetVATRate()
        {
            string plsVATRate;
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();

            mycommand = new SqlCommand("Select VAT FROM tblVat", myconnection);
            dr = mycommand.ExecuteReader();
            dr.Read();
            plsVATRate = ((Convert.ToDouble(dr["VAT"]) / 100) + 1).ToString();

            dr.Close();
            myconnection.Close();
            return Convert.ToDouble(plsVATRate);
        }

        [HttpGet]
        [Route("API/WebAPI/GetTaxWithheldRate")]
        [Authorize]
        public async Task<double> GetTaxWithheldRate(string strTWHCode)
        {
            string result;
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();

            mycommand = new SqlCommand($"SELECT * FROM tblTaxWithHeldRate WHERE TWHCode='{strTWHCode}'", myconnection);
            dr = mycommand.ExecuteReader();
            dr.Read();

            result = (Convert.ToDouble(dr["TWHRate"]) / 100).ToString("N2");

            dr.Close();
            myconnection.Close();
            return Convert.ToDouble(result);
        }

        [HttpGet]
        [Route("API/WebAPI/GetPA")]
        [Authorize]
        public IEnumerable<ClsModelPA> GetPA()
        {
            List<ClsModelPA> MSSQLClsModelPA = new List<ClsModelPA>();

            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();

            mycommand = new SqlCommand("SELECT PA,AT FROM viewpa", myconnection);
            dr = mycommand.ExecuteReader();
            while (dr.Read()) 
            {
                ClsModelPA ClsModelPA1 = new ClsModelPA()
                {
                    PA = dr["PA"].ToString(),
                    AT = dr["AT"].ToString()
                };
                MSSQLClsModelPA.Add(ClsModelPA1);
            }
            dr.Close();
            myconnection.Close();
            return MSSQLClsModelPA;
        }

        [HttpGet]
        [Route("API/WebAPI/GetSalesman")]
        [Authorize]
        public IEnumerable<ClsModelSalesman> GetSalesman()
        {
            List<ClsModelSalesman> MSSQLClsModelSalesman = new List<ClsModelSalesman>();

            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();

            mycommand = new SqlCommand("SELECT SMCode, SMDesc FROM tblSalesman WHERE Active=1 ORDER by SMDesc", myconnection);
            dr = mycommand.ExecuteReader();
            while (dr.Read())
            {
                ClsModelSalesman ClsModelSalesman1 = new ClsModelSalesman()
                {
                    SMCode = dr["SMCode"].ToString(),
                    SMDesc = dr["SMDesc"].ToString()
                };
                MSSQLClsModelSalesman.Add(ClsModelSalesman1);
            }
            dr.Close();
            myconnection.Close();
            return MSSQLClsModelSalesman;
        }

        [HttpGet]
        [Route("API/WebAPI/GetDivision")]
        [Authorize]
        public IEnumerable<ClsModelDivision> GetDivision()
        {
            List<ClsModelDivision> MSSQLDivisionDesc = new List<ClsModelDivision>();

            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();

            mycommand = new SqlCommand("SELECT DivisionCode, DivisionDesc FROM tblDivision ORDER by DivisionDesc", myconnection);
            dr = mycommand.ExecuteReader();
            while (dr.Read())
            {
                ClsModelDivision ClsModelDivision1 = new ClsModelDivision()
                {
                    DivisionCode = dr["DivisionCode"].ToString(),
                    DivisionDesc = dr["DivisionDesc"].ToString()
                };
                MSSQLDivisionDesc.Add(ClsModelDivision1);
            }
            dr.Close();
            myconnection.Close();
            return MSSQLDivisionDesc;
        }


        [HttpGet]
        [Route("API/WebAPI/GetBatchList")]
        public IEnumerable<ClsModelTblMain2> GetBatchList(string strStockNumber)
        {
            DateTime tempDate;

            List<ClsModelTblMain2> MSSQLClsModelTblMain2 = new List<ClsModelTblMain2>();

            myconnection = new SqlConnection( new ClsGetConnection().PlsConnect());
            myconnection.Open();

            mycommand = new SqlCommand("SELECT BatchNo, ExpDate FROM ViewStockBatchNoExp WHERE StockNumber = @_StockNumber", myconnection);
            mycommand.Parameters.AddWithValue("_StockNumber", strStockNumber);
            dr = mycommand.ExecuteReader();

            while (dr.Read()) 
            {

                ClsModelTblMain2 ClsModelTblMain21 = new ClsModelTblMain2
                {
                    BatchNo = dr["BatchNo"].ToString(),
                    ExpDate = DateTime.TryParse(dr["ExpDate"].ToString(), out tempDate) ? (DateTime?)tempDate : null,
                };
                MSSQLClsModelTblMain2.Add(ClsModelTblMain21);
            }
            dr.Close();
            myconnection.Close();
            return MSSQLClsModelTblMain2;
        }

    }
}
