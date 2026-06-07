using System.Reflection.PortableExecutable;
using System.Text;

public class LocalizationAndGlobalization {
    public static void Main() {
        char[] greekChars = {};
        Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);

        Encoding cp737 = Encoding.GetEncoding(737);
        int nBytes = cp737.GetByteCount(greekChars);
        byte[] bytes737 = new byte[nBytes];
        bytes737 = cp737.GetBytes(greekChars);

        FileStream fs = new FileStream(@".\\CodePageBytes.dat", FileMode.Open);
        fs.Write(bytes737, 0, bytes737.Length);
        fs.Close();
    }
}