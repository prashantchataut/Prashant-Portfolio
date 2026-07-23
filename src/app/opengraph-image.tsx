import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Prashant Chataut';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#FAF7F2',
                    backgroundImage: 'linear-gradient(135deg, #FAF7F2 0%, #F5F0E8 100%)',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 16,
                    }}
                >
                    <h1
                        style={{
                            fontSize: 88,
                            fontWeight: 700,
                            color: '#1A1612',
                            lineHeight: 1,
                            margin: 0,
                            letterSpacing: '-0.03em',
                        }}
                    >
                        Prashant Chataut
                    </h1>
                    <p
                        style={{
                            fontSize: 28,
                            color: '#8A8078',
                            lineHeight: 1.3,
                            margin: 0,
                            marginTop: 8,
                            letterSpacing: '-0.02em',
                        }}
                    >
                        I build apps.
                    </p>
                    <p
                        style={{
                            fontSize: 20,
                            color: '#D97706',
                            margin: 0,
                            marginTop: 28,
                            letterSpacing: '0.04em',
                        }}
                    >
                        NEBians · Retra · Prody
                    </p>
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
