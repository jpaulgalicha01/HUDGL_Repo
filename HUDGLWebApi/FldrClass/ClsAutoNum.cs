using Microsoft.Data.SqlClient;
using System.Data.Common;

namespace HUDGLWebApi.FldrClass
{
    public class ClsAutoNum
    {
        SqlConnection myconnection;
        SqlCommand mycommand;
        SqlDataReader dr;

        public async Task<string> GetVoucherAutoNum(string strVoucher, string strCnCode)
        {
            string result;
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();

            mycommand = new SqlCommand($"SELECT COUNT(*) FROM tblMain1 WHERE CNCode=@_CNCode AND Voucher =@_Voucher AND (ISNUMERIC(DocNum) = 1)", myconnection);
            mycommand.Parameters.AddWithValue("_CNCode", strCnCode);
            mycommand.Parameters.AddWithValue("_Voucher", strVoucher);
            int count = (int)mycommand.ExecuteScalar();
            if (count != 0)
            {

                mycommand = new SqlCommand($"SELECT Top 1 DocNum FROM tblMain1 WHERE CNCode=@_CNCode AND Voucher = @_Voucher AND (ISNUMERIC(DocNum) = 1) ORDER BY DocNum DESC", myconnection);
                mycommand.Parameters.AddWithValue("_CNCode", strCnCode);
                mycommand.Parameters.AddWithValue("_Voucher", strVoucher);

                dr = mycommand.ExecuteReader();
                dr.Read();
                string no1;
                int no2;
                no1 = dr["DocNum"].ToString();
                no2 = (int.Parse(no1)) + 1;
                result = Convert.ToString(no2).PadLeft(7, '0');
                dr.Close();
            }
            else
            {
                result = "0000001";
            }
            myconnection.Close();
            return result;
        }
    }
}
