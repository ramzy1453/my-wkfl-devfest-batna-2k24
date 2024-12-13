import { NextResponse } from "next/server";
import { IgApiClient } from "instagram-private-api";

export async function GET() {
  try {
    const ig = new IgApiClient();
    // You must generate device id's before login.
    // Id's generated based on seed
    // So if you pass the same value as first argument - the same id's are generated every time
    ig.state.generateDevice("al_andalussi.1453");

    await ig.simulate.preLoginFlow();

    const loggedInUser = await ig.account.login(
      "al_andalussi.1453",
      "algerieottomane"
    );
    console.log(loggedInUser);
    return NextResponse.json({
      screen_name: loggedInUser.username,
    });
  } catch (e) {
    NextResponse.error();
    return NextResponse.json({ e });
  }
}
