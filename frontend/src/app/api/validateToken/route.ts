import { NextApiRequest, NextApiResponse } from 'next';
import { cookies } from 'next/headers'

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    try {
    //   const { accessToken } = req.cookies;

      const cookieStore = cookies()
      const accessToken = cookieStore.get('accessToken')?.value
      const backend = process.env.NEXT_PUBLIC_NEXTBACKEND_URL;
    //   console.log('accessToken:', accessToken2.value);
            // console.log('Request Headers:', req.headers);


      if (!accessToken) {
        localStorage.clear();
        cookies().delete('accessToken')
        return Response.json({ valid: false, error: 'Access token not found in cookies' });
      }
  
      // validate the token
      const profileResponse = await fetch(`${backend}/users/profile`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      // Check if response is successful
      if (!profileResponse.ok) {
        return Response.json({ valid: false, error: 'Access token invalid' });
      }
      return Response.json({ valid: true });
    } catch (error) {
        return Response.json({ valid: false, error: 'Access token invalid' });
    }
  }
  