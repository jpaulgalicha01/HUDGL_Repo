using HUDGLV2WebAPI.Authentication;
using HUDGLWebApi.FldrClass;
using HUDGLWebAPI.Authentication;
using HUDGLWebAPI.FldrClass;
using HUDGLWebApi.FldrModel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace HUDGLWebApi.Controllers
{
    [ApiController]
    public class SecurityController : Controller
    {
        SqlCommand mycommand;
        SqlConnection myconnection;
        SqlDataReader dr;



        [HttpGet]
        [Route("API/WebAPI/ConnectionStatus/Online")]
        public IActionResult ConnectionStatus()
        {
            return Ok("Connected!");
        }


        [HttpGet]
        [Route("API/HUDGLWebAPI/CheckUserName")]
        public string CheckUserName(string strUserName,string strPassword)
        {
            string result;
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();

            mycommand = new SqlCommand($"SELECT COUNT(*) FROM tblUser WHERE UserName=@_UserName",myconnection);
            mycommand.Parameters.AddWithValue("@_UserName", strUserName);
            mycommand.ExecuteNonQuery();

            int count = (int)mycommand.ExecuteScalar();
            if(count == 1 )
            {
                return new ClsGetSomething().CheckingUserNamePass(strUserName, strPassword);
            }
            else
            {
                result = "Username does not exist";
            }
            myconnection.Close();
            return result;

        }


        [HttpGet]
        [Route("API/HUDGLWebAPI/GetToken")]
        public ActionResult<UserSession> GetLoginlALlUserInfo(string strUserName, string strPassword)
        {
            var jwtAuthenticationManager = new JwtAuthenticatonManagerAllUser(new AllUserAccountService());
            var userSession = jwtAuthenticationManager.GenerateJwtToken(strUserName, new ClsHash().getMd5Hash(strPassword));
            if (userSession is null)
            {
                return Unauthorized();
            }
            else
            {

                return userSession;
            }
        }


    }
}
