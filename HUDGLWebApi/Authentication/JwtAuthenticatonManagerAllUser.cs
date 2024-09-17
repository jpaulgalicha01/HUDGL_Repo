using HUDGLWebApi.FldrModel;
using HUDGLWebAPI.Authentication;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace HUDGLV2WebAPI.Authentication
{
    public class JwtAuthenticatonManagerAllUser
    {
        public const string JWT_Security_Key = "yHjs67HDSbsadfh96hsahkGIdajsd2Hah2h8Hk3asdawAafusdkgfaiwersgfatgfasdfdshkfkagr3yr6328dfbfasdfasdfF243az";
        private const int JWT_TOKEN_VALIDITY_MINS = 720;

        private AllUserAccountService _allUserAccountService;
        public JwtAuthenticatonManagerAllUser(AllUserAccountService allUserAccountService)
        {
            _allUserAccountService = allUserAccountService;
        }

        public UserSession GenerateJwtToken(string userName, string password)
        {
            if (string.IsNullOrWhiteSpace(userName) || string.IsNullOrWhiteSpace(password))
                return null;

            var userAccount = _allUserAccountService.GetAllUserAccountByUserName(userName);
            if (userAccount == null || userAccount.PWord != password)
                return null;

            var tokenExpiryTimeStamp = DateTime.Now.AddMinutes(JWT_TOKEN_VALIDITY_MINS);
            var tokenKey = Encoding.ASCII.GetBytes(JWT_Security_Key);
            var claimsIdentity = new ClaimsIdentity(new List<Claim>
            {
                new Claim(ClaimTypes.Name, userAccount.UserName),
                new Claim(ClaimTypes.Role, userAccount.GroupCode),
				//new Claim(ClaimTypes.GivenName, userAccount.CompleteName),
			});

            var signingCredentials = new SigningCredentials(
                new SymmetricSecurityKey(tokenKey),
                SecurityAlgorithms.HmacSha256Signature);

            var securityTokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = claimsIdentity,
                Expires = tokenExpiryTimeStamp,
                SigningCredentials = signingCredentials
            };

            var jwtSecurityTokenHandler = new JwtSecurityTokenHandler();
            var securityToken = jwtSecurityTokenHandler.CreateToken(securityTokenDescriptor);
            var token = jwtSecurityTokenHandler.WriteToken(securityToken);

            var userSession = new UserSession
            {
                UserCode = userAccount.UserCode,
                //CompleteName = userAccount.CompleteName,
                UserName = userAccount.UserName,
                GroupCode = userAccount.GroupCode,
                Active = (bool)userAccount.Active,
                CNCode = userAccount.CNCode,
                Token = token,
                ExpiresIn = (int)tokenExpiryTimeStamp.Subtract(DateTime.Now).TotalSeconds
            };
            return userSession;
        }
    }
}
