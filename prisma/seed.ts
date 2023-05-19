import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
	const book = await prisma.book.create({
		data: {
			isbn: '978-1600510052',
			title: 'Latin for Children, Primer A - Activity Book!',
			language: 'English',
			publishDate: new Date('2005-06-01'),
			publisher: 'Classical Academic Press',
			width: 8.59,
			length: 11.14,
			description: 'The Latin for Children, A Activity Book accompanies the Latin For Children Primer A, following chapter by chapter to supplement and enhance your practice of Latin vocabulary and grammar. With over one hundred pages of games, puzzles and fun, these books make mastery of the classic language a blast! Sail around the world, find your way out of dungeon mazes, rescue the captive Latin words from the evil wizard, weed out the wrong crossword puzzle questions... and so much more.Classical Academic Press\nEducators will find all curricula by Classical Academic Press to be created with four important attributes. Each product is classical, creative, relevant, and easy to use. As our company name implies, you will find that we publish classical books and media, seeking to acquaint students with the best that has been thought and said.\nWe also design and present our products with creativity and zest, from beautiful illustrations to engaging storytelling, ensuring that the classical subjects being taught are anything but boring.\nAreas we publish in include:\n-Latin\n-Ancient Greek\n-Logic\n-Bible, Old & NAmish widow Sarah Wyse and her neighbor Levi Beachy try to help each other find love this Christmas season, not realizing it is much closer than they think.ew Testament\n-The Art Of Poetry\n-Spanish\n-Classical Education Resources',
			coverUrl: 'https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/512ZB-LkLPL._SX384_BO1,204,203,200_.jpg',
			quantity: 12,
			price: 21.91,
			pageCount: 163,
			authors: {
				create: [
					{
						role: 'Author',
						author: {
							connectOrCreate: {
								where: { name: 'Rob Baddorf' },
								create: {
									name: 'Rob Baddorf',
									imageUrl: 'https://m.media-amazon.com/images/S/amzn-author-media-prod/1kbqb4o92kkfbuu8lgusdr8orr._SX300_CR0%2C0%2C0%2C0_.jpg',
									about: 'Rob Baddorf grew up in the small woods behind his house. If he wasn\'t fighting off monsters with stick swords, he was looking for a pack of wolves to raise him. He loved jumping creeks, banging on his Commodore 64, and riding bikes with his friends.\nHe worked many years as a creative director and then started his own publishing company. He kisses his beautiful business partner (wife) every night after tussling with the kids.\nwww.RobBaddorf.com'
								}
							}
						}
					},
					{
						role: 'Foreword',
						author: {
							connectOrCreate: {
								where: { name: 'Christopher Perrin' },
								create: {
									name: 'Christopher Perrin',
									about: ''
								}
							}
						}
					}
				]
			},
			cats: {
				create: [{ name: 'Children\'s Books' }, { name: 'Education & Teaching' }]
			}
		}
	})

	console.log(book);
}

main()
	.catch(e => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		// close Prisma Client at the end
		await prisma.$disconnect();
	});