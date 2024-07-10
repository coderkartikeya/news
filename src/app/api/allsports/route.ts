
import { NextRequest, NextResponse } from "next/server";
import puppeteer from 'puppeteer';
import dotenv from 'dotenv';

const scrapingUrl = process.env.SCRAPING_URL2;

dotenv.config();

export async function GET() {
    try {
        const contents=[];
        const browser = await puppeteer.launch({ headless: true });
        for(let i=1;i<5;i++){
            const page = await browser.newPage();
            await page.goto(`${scrapingUrl}page/${i}`);
            const content = await page.evaluate(() => {
                const elements = document.querySelectorAll('.articles '); 
                return Array.from(elements).map((element) => {
                  return {
                    title: element.querySelector('.title a')?.textContent?.trim(),
                    time: element.querySelector('.date')?.textContent,
                    content: element.querySelector('.img-context p')?.textContent?.trim(),
                    image: element.querySelector('.snaps img')?.getAttribute('src')
                  };
                });
              });
              contents.push(...content);
            await page.close();

        }
         

              

        
        

        await browser.close();

        
        return NextResponse.json({
            status: 200,
            result: contents
        });

    } catch (error) {
        console.error(error);
        return NextResponse.json({
            status: 400,
            result: error
        });
    }
}
export async function POST(res:any){
    try{

        
        return NextResponse.json({
            status:200,
            result:"done"
        })
        

    }catch(error){
        console.error(error);
        return NextResponse.json({
            status:400,
            result:error
        })
    }
}

export const dynamic = "force-static";