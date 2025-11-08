import db from "./connections.ts";
import { users, habits, entries, tags, habitTags } from './schema.ts'

const seed = async () => {
    console.log('🌱 starting database seed...')

    try {
        console.log('Clearing existing data...')
        await db.delete(users)
        await db.delete(habits)
        await db.delete(entries)
        await db.delete(tags)
        await db.delete(habitTags)

        console.log('Creaating demo users...')
        const [demoUser] = await db.insert(users).values({
            email: 'demo@app.com',
            password: 'password',
            firstName: 'John',
            lastName: 'Doe',
            username: 'demo'
        }).returning()

        console.log('Create tags...')
        const [healthTag] = await db.insert(tags).values({
            name: 'Health',
            color: '#f0f0f0',
        }).returning()

        const [productivityTag] = await db.insert(tags).values({ 
            name: 'Productivity', 
            color: '#3B82F6'
        }).returning()

        console.log('Creating demo habits...')
        const [exerciseHabit] = await db.insert(habits).values({
            userId: demoUser.id,
            name: 'Exercise',
            description: 'Daily workout routine',
            frequency: 'daily',
            targetCount: 1,
        }).returning()

        await db.insert(habitTags).values({
            habitId: exerciseHabit.id,
            tagId: healthTag.id
        })

        console.log('Adding completion entries...')

        const today = new Date()
        today.setHours(12, 0, 0, 0)

        for (let i = 0; i < 7; i++) {
            const date = new Date(today)
            date.setDate(date.getDate() - i)
            await db.insert(entries).values({
                habitId: exerciseHabit.id,
                completion_date: date,
                note: i === 0 ? 'Great workout today!' : null,
            })
        }

        console.log('✅ DB seeded successfully')
        console.log('\n🔑 Login Credentials:')
        console.log(`Email: ${demoUser.email}`)
        console.log(`Password: ${demoUser.password}`)
    } catch (e) {
        console.error('❌ Seed failed:', e)
        process.exit(1)
    }
}

if (import.meta.url === `file://${process.argv[1]}`) {
    seed()
    .then(
        () => process.exit(0)
    ).catch(
        (e) => process.exit(1)
    )
}

export default seed