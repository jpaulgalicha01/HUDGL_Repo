namespace HUDGLWebApi.FldrModel
{
    public class UserAccount
    {
        public string? UserCode { get; set; }
        public string? UserName { get; set; }
        public string? CompleteName { get; set; }
        public string? PWord { get; set; }
        public string? CNCode { get; set; }
        public string? GroupCode { get; set; }
        public string? GroupName { get; set; }
        public bool? Active { get; set; }
    }
    //Session Security
    public class UserSession
    {
        public string? UserCode { get; set; }
        public string? UserName { get; set; }
        public string? GroupCode { get; set; }
        public string? Token { get; set; }
        public int? ExpiresIn { get; set; }
        public DateTime? ExpiryTimeStamp { get; set; }
        public string? CNCode { get; set; }
        public bool? Active { get; set; }
    }
}
