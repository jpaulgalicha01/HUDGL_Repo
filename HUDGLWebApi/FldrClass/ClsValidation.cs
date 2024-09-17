namespace HUDGLWebApi.FldrClass
{
    public class ClsValidation
    {
        public bool emptytxt(string val)
        {
            if (String.IsNullOrEmpty(val))
                return true;
            else
                return false;
        }
    }
}
