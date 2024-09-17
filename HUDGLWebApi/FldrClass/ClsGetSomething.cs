using HUDGLWebApi.FldrModel;
using HUDGLWebAPI.FldrClass;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Data.Common;

namespace HUDGLWebApi.FldrClass
{
    public class ClsGetSomething
    {
        SqlConnection myconnection;
        SqlCommand mycommand;
        SqlDataReader dr;

        public string CheckingUserNamePass(string stUserName, string strPassword)
        {
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();

            mycommand = new SqlCommand(string.Format($"SELECT PWord FROM tblUser WHERE UserName=@_UserName"), myconnection);
            mycommand.Parameters.AddWithValue("@_UserName", stUserName);
            mycommand.ExecuteNonQuery();
            string GetPWord = mycommand.ExecuteScalar().ToString();
            myconnection.Close();

            if (new ClsHash().verifyMd5Hash(strPassword, GetPWord))
            {

                return "OK";
            }
            else
            {
                return "Not Match Password";
            }

        }

        public  List<ClsModelUM> GetUm(int varintIB, string strUMCS, string strUMIB, string strUMPC)
        {
            List<ClsModelUM> MSSQLClsModelUM = new List<ClsModelUM>();
            string sqlstatement;
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();

            if (varintIB == 0)
            {
                sqlstatement = "SELECT UM As UM1, (SELECT CASE WHEN UM='CS' THEN '" + strUMCS + "' ";
                sqlstatement += "WHEN UM='IB' THEN '" + strUMIB + "' WHEN UM='PC' THEN '" + strUMPC + "' END AS UM2) As UM2 ";
                sqlstatement += "FROM tblUM1";

            }
            else
            {
                sqlstatement = "SELECT UM As UM1, (SELECT CASE WHEN UM='CS' THEN '" + strUMCS + "' ";
                sqlstatement += "WHEN UM='IB' THEN '" + strUMIB + "' WHEN UM='PC' THEN '" + strUMPC + "' END AS UM2) As UM2 ";
                sqlstatement += "FROM tblUM";

            }
            mycommand = new SqlCommand(sqlstatement, myconnection);
            dr = mycommand.ExecuteReader();

            while (dr.Read()) 
            {
                ClsModelUM ClsModelUM1 = new ClsModelUM
                {
                    um1 = dr["UM1"].ToString(),
                    um2 = dr["UM2"].ToString(),
                };

                MSSQLClsModelUM.Add(ClsModelUM1);
            }

            dr.Close();
            myconnection.Close();
            return MSSQLClsModelUM;
        }


    }
}
