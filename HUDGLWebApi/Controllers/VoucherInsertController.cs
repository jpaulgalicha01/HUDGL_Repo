using HUDGLWebApi.FldrClass;
using HUDGLWebApi.FldrModel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Data;
using System.Diagnostics;

namespace HUDGLWebApi.Controllers
{
    [ApiController]
    public class VoucherInsert : Controller
    {
        SqlTransaction mytransaction;

        SqlConnection myconnection;
        SqlCommand mycommand;
        SqlDataReader dr;

        [HttpPost]
        [Route("API/WEBAPI/InsertModeltblMain1")]
        public async Task<string> InsertModeltblMain1(ClsModelTblMain1 ClsModelTblMain11)
        {
            const int maxRetryCount = 5;
            int retryCount = 0;

            while (retryCount <= maxRetryCount)
            {
                myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
                await myconnection.OpenAsync();
                mytransaction = myconnection.BeginTransaction(IsolationLevel.Serializable);

                try
                {

                    mycommand = new SqlCommand($"SELECT Count(*) FROM tblmain1 WHERE Reference ='{ClsModelTblMain11.Reference}' AND Voucher = '{ClsModelTblMain11.Voucher}' ", myconnection, mytransaction);
                    int count = (int)mycommand.ExecuteScalar();

                    if(count >= 1)
                    {
                        return "Duplicate Referrence";
                    }

                    string sqlquery1 = "INSERT INTO tblmain1 (IC, DocNum, Voucher, UserCode, ControlNo, TDate, VDate, Reference, Term, Remarks, CheckNo, CAmount, ASMCode, DE, CNCode, DivisionCode, TotalDisct, TotalPDisct)" +
                        "Values (@_IC, @_DocNum, @_Voucher, @_UserCode, @_ControlNo, @_TDate, @_VDate, @_Reference, @_Term, @_Remarks, @_CheckNo, @_CAmount, @_ASMCode, @_DE, @_CNCode, @_DivisionCode, @_TotalDisct, @_TotalPDisct)";

                    string sqlquery2 = "INSERT INTO tblmain2 (IC, StockNumber,  PIn, POut, UP, Cost, ActDisct, PDisct, VAT, UM, RowNum, D1, D2, D3, WHCode, BatchNo, ExpDate, DivisionCode)" +
                       "Values (@_IC, @_StockNumber, @_PIn, @_POut, @_UP, @_Cost, @_ActDisct, @_PDisct, @_VAT, @_UM, @_RowNum, @_D1, @_D2, @_D3, @_WHCode, @_BatchNo, @_ExpDate, @_DivisionCode)";

                    string sqlquery3 = "INSERT INTO tblmain3 (IC, Refer, Debit, Credit, PA, SIT, RowNum, DivisionCode) Values (@_IC, @_Refer, @_Debit, @_Credit, @_PA, @_SIT, @_RowNum, @_DivisionCode)";


                    var autonum = await new ClsAutoNum().GetVoucherAutoNum(ClsModelTblMain11.Voucher, ClsModelTblMain11.CNCode);
                    mycommand = new SqlCommand(sqlquery1, myconnection,mytransaction);
                    
                    mycommand.Parameters.Add("_IC", SqlDbType.VarChar).Value = ClsModelTblMain11.Voucher + autonum + ClsModelTblMain11.CNCode; 
                    mycommand.Parameters.Add("_DocNum", SqlDbType.VarChar).Value = autonum; 
                    mycommand.Parameters.Add("_Voucher", SqlDbType.VarChar).Value = ClsModelTblMain11.Voucher;
                    mycommand.Parameters.Add("_UserCode", SqlDbType.VarChar).Value = ClsModelTblMain11.UserCode; 
                    mycommand.Parameters.Add("_ControlNo", SqlDbType.VarChar).Value = ClsModelTblMain11.ControlNo; 
                    mycommand.Parameters.Add("_TDate", SqlDbType.DateTime).Value = ClsModelTblMain11.TDate;
                    mycommand.Parameters.Add("_VDate", SqlDbType.DateTime).Value = ClsModelTblMain11.VDate; 
                    mycommand.Parameters.Add("_Reference", SqlDbType.VarChar).Value = ClsModelTblMain11.Reference; 
                    mycommand.Parameters.Add("_Term", SqlDbType.Int).Value = ClsModelTblMain11.Term; 
                    mycommand.Parameters.Add("_Remarks", SqlDbType.VarChar).Value = ClsModelTblMain11.Remarks; 
                    mycommand.Parameters.Add("_CheckNo", SqlDbType.VarChar).Value = ClsModelTblMain11.CheckNo; 
                    mycommand.Parameters.Add("_CAmount", SqlDbType.Money).Value = ClsModelTblMain11.CAmount; 
                    mycommand.Parameters.Add("_ASMCode", SqlDbType.VarChar).Value = ClsModelTblMain11.ASMCode; 
                    mycommand.Parameters.Add("_DE", SqlDbType.DateTime).Value = DateTime.Now; 
                    mycommand.Parameters.Add("_CNCode", SqlDbType.Char).Value = ClsModelTblMain11.CNCode; 
                    mycommand.Parameters.Add("_DivisionCode", SqlDbType.Char).Value = ClsModelTblMain11.DivisionCode;
                    mycommand.Parameters.Add("_TotalDisct", SqlDbType.Money).Value = ClsModelTblMain11.TotalDisct; 
                    mycommand.Parameters.Add("_TotalPDisct", SqlDbType.Money).Value = ClsModelTblMain11.TotalPDisct; 
                    await mycommand.ExecuteNonQueryAsync();

                    if (ClsModelTblMain11.ModelTblMain2 != null && ClsModelTblMain11.ModelTblMain2.Count > 0)
                    {
                        foreach (var varlist in ClsModelTblMain11.ModelTblMain2)
                        {
                            mycommand = new SqlCommand(sqlquery2, myconnection, mytransaction);
                            

                            mycommand.Parameters.Add("_IC", SqlDbType.VarChar).Value = ClsModelTblMain11.Voucher + autonum + ClsModelTblMain11.CNCode;
                            mycommand.Parameters.Add("_StockNumber", SqlDbType.VarChar).Value = varlist.StockNumber;
                            mycommand.Parameters.Add("_PIn", SqlDbType.Decimal).Value = varlist.PIn;
                            mycommand.Parameters.Add("_POut", SqlDbType.Decimal).Value = varlist.POut;
                            mycommand.Parameters.Add("_UP", SqlDbType.Decimal).Value = varlist.UP;
                            mycommand.Parameters.Add("_Cost", SqlDbType.Decimal).Value = varlist.Cost;
                            mycommand.Parameters.Add("_ActDisct", SqlDbType.Decimal).Value = varlist.ActDisct;
                            mycommand.Parameters.Add("_PDisct", SqlDbType.Decimal).Value = varlist.PDisct;
                            mycommand.Parameters.Add("_VAT", SqlDbType.Decimal).Value = varlist.VAT;
                            mycommand.Parameters.Add("_UM", SqlDbType.VarChar).Value = varlist.UM;
                            mycommand.Parameters.Add("_RowNum", SqlDbType.Int).Value = varlist.RowNum;
                            mycommand.Parameters.Add("_D1", SqlDbType.Decimal).Value = varlist.D1;
                            mycommand.Parameters.Add("_D2", SqlDbType.Decimal).Value = varlist.D2;
                            mycommand.Parameters.Add("_D3", SqlDbType.Decimal).Value = varlist.D3;
                            mycommand.Parameters.Add("_WHCode", SqlDbType.VarChar).Value = varlist.WHCode;

                            if (new ClsValidation().emptytxt(varlist.BatchNo))
                            { mycommand.Parameters.Add("_BatchNo", SqlDbType.VarChar).Value = DBNull.Value; }
                            else
                            { mycommand.Parameters.Add("_BatchNo", SqlDbType.VarChar).Value = varlist.BatchNo; }

                            if (new ClsValidation().emptytxt(varlist.ExpDate.ToString()))
                            { mycommand.Parameters.Add("_ExpDate", SqlDbType.DateTime).Value = DBNull.Value; }
                            else
                            { mycommand.Parameters.Add("_ExpDate", SqlDbType.DateTime).Value = varlist.ExpDate; }
                            mycommand.Parameters.Add("_DivisionCode", SqlDbType.VarChar).Value = ClsModelTblMain11.DivisionCode;
                            await mycommand.ExecuteNonQueryAsync();

                        }
                    }
                    if (ClsModelTblMain11.ModelTblMain3 != null && ClsModelTblMain11.ModelTblMain3.Count > 0)
                    {
                        int i = 0;
                        foreach (var varlist2 in ClsModelTblMain11.ModelTblMain3)
                        {
                            mycommand = new SqlCommand(sqlquery3, myconnection, mytransaction);

                            mycommand.Parameters.Add("_IC", SqlDbType.VarChar).Value = ClsModelTblMain11.Voucher + autonum + ClsModelTblMain11.CNCode;
                            mycommand.Parameters.Add("_PA", SqlDbType.VarChar).Value = varlist2.PA;
                            mycommand.Parameters.Add("_Refer", SqlDbType.VarChar).Value = varlist2.Refer;
                            mycommand.Parameters.Add("_Debit", SqlDbType.Decimal).Value = varlist2.Debit;
                            mycommand.Parameters.Add("_Credit", SqlDbType.Decimal).Value = varlist2.Credit;
                            mycommand.Parameters.Add("_SIT", SqlDbType.VarChar).Value = varlist2.SIT;
                            mycommand.Parameters.Add("_RowNum", SqlDbType.Int).Value = i++;
                            mycommand.Parameters.Add("_DivisionCode", SqlDbType.VarChar).Value = ClsModelTblMain11.DivisionCode;
                            await mycommand.ExecuteNonQueryAsync();
                        }
                    }

                    await mytransaction.CommitAsync();
                    return "OK";
                }
                catch (SqlException ex)
                {
                    mytransaction.Rollback();
                    if (ex.Number == 2627)//code primary key
                    {
                        if (retryCount >= maxRetryCount)
                        {
                            return $"Duplicate Primary Key value {ex.Message.Split('(')[1].Split(')')[0]}. Please try again!";
                        }
                        //await Task.Delay(500);
                        retryCount++;
                        //return "2627";
                    }
                    else if (ex.Number == 2628)//truncated
                    {
                        //return ex.Message;
                        return $"! Truncated value {ex.Message.Split('\'')[5]}";
                    }
                    else
                    {
                        return $"! Contact Your Administrator! {ex.Message}";
                    }
                }
                catch (Exception ex)
                {
                    mytransaction.Rollback();
                    return "! Contact Your Administrator!";
                    //return new HttpResponseMessage(HttpStatusCode.OK);
                }
                finally
                {
                    await myconnection.CloseAsync();
                }
            }

            return "! Contact Your Administrator!";
        }
    }
}
