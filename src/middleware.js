import { NextResponse } from "next/server"

export function middleware(request) {
    const { pathname } = request.nextUrl

    console.log(pathname)

    let url = request.nextUrl.clone()

    const cookieValue = request.cookies.get('accessToken')?.value

    const userDetail = cookieValue

    console.log(userDetail)

    const isLoggin = userDetail ? true : false

    console.log(isLoggin)

    if (isLoggin) {
      console.log("Hellooo")
    } else if (!isLoggin) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/notes',
    ],
};