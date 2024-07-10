import { NextRequest, NextResponse } from "next/server";
import puppeteer from 'puppeteer';
import dotenv from 'dotenv';

dotenv.config();

const scrapingUrl = process.env.SCRAPING_URL1;

export async function GET() {
    try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto(`${scrapingUrl}`, { timeout: 60000 });

        const urls = await page.evaluate(scrapingUrl => {
            const elements = document.querySelectorAll('.cb-nws-hdln-ancr');
            return Array.from(elements).map(e => `${scrapingUrl}${e.getAttribute('href')}`);
        }, scrapingUrl);

        const data = await Promise.all(urls.map(async url => {
            const page = await browser.newPage();
            await page.goto(url, { timeout: 60000 });

            const content = await page.evaluate(() => {
                const paragraphs = document.querySelectorAll('.cb-nws-para');
                return {
                    title: document.querySelector('.nws-dtl-hdln')?.textContent?.trim() || '',
                    content: Array.from(paragraphs).map(p => p.textContent?.trim()),
                    image: `${scrapingUrl}${document.querySelector('.cb-news-img-section img')?.getAttribute('src')}` || ''
                };
            });

            await page.close();
            return content;
        }));

        await browser.close();

        return NextResponse.json({
            status: 200,
            result: data
        });

    } catch (error) {
        console.error(error);
        return NextResponse.json({
            status: 400,
            result: error
        });
    }
}

export async function POST(req:any) {
    try {
        return NextResponse.json({
            status: 200,
            result: "done"
        });

    } catch (error) {
        console.error(error);
        return NextResponse.json({
            status: 400,
            result: error
        });
    }
}

export const dynamic = "force-static";
