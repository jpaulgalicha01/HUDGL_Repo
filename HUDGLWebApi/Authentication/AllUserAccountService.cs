using HUDGLWebApi.FldrClass;
using HUDGLWebApi.FldrModel;
using Microsoft.Data.SqlClient;

namespace HUDGLWebAPI.Authentication
{
    public class AllUserAccountService
    {
        SqlConnection myconnection;
        SqlCommand mycommand;
        SqlDataReader dr;
        private List<UserAccount> _userAccountList;

        public AllUserAccountService()
        {

            _userAccountList = new List<UserAccount>();
            string SqlSentenceView = $"SELECT * FROM tblUser";

            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();
            mycommand = new SqlCommand(SqlSentenceView, myconnection);
            dr = mycommand.ExecuteReader();
            while (dr.Read())
            {
                UserAccount Mdl1 = new UserAccount
                {
                    UserCode = dr["UserCode"].ToString(),
                    UserName = dr["UserName"].ToString(),
                    PWord = dr["PWord"].ToString(),
                    GroupCode = dr["GroupCode"].ToString(),
                    CNCode = dr["CNCode"].ToString(),
                    Active = bool.Parse(dr["Active"].ToString()),
                    //CompleteName = dr["CompleteName"].ToString(),
                    //Active = bool.Parse(dr["Active"].ToString()), 
                };
                _userAccountList.Add(Mdl1);
            }
            myconnection.Close();
        }

        public UserAccount? GetAllUserAccountByUserName(string userName)
        {
            return _userAccountList.FirstOrDefault(x => x.UserName == userName);
        }
    }
}
