import { GetStaticProps } from 'next';
import React, { useEffect, useState } from 'react';
import { Htag, Button, Ptag, Badge, Rating } from '../components';
import { withLayout } from '../layout/Layout';
import axios from 'axios';
import { MenuItem } from '../interfaces/menu.interface';

function Home({ menu }: HomeProps): JSX.Element {
	const [rating, setRating] = useState<number>(3);

	// useEffect(() => {}, []); in such manner it will be executed 1 time on mount
	//useEffect(() => {}); by this way it will be executed on evevry render!!
	// useEffect(() => { // effect   return function clean(){};}, []); is exectued on unmount
	// useEffect(() => {}, [counter]) // is executed when counter value is changed
	return (
		<>
			<Htag tag='h1'>Text</Htag>
			<Button appearance='ghost' arrow='right'>Appearance</Button>
			<Ptag size='m'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non praesentium deleniti placeat at corporis tempore nostrum recusandae ratione laudantium ex ipsam voluptatibus, labore officiis dolor expedita fugit sed et? Odit!</Ptag>
			<Badge size='s' color='ghost'>Lorem</Badge>
			<Badge size='s' color='red'>Lorem</Badge>
			<Badge size='s' color='green'>Lorem</Badge>
			<Badge size='s' color='primary'>Lorem</Badge>
			<Badge size='m' color='ghost'>Lorem</Badge>
			<Badge size='m' color='red'>Lorem</Badge>
			<Badge size='m' color='primary'>Lorem</Badge>
			<Badge size='m' color='grey'>Lorem</Badge>
			<Badge size='m' color='green' href='https://github.com/Sinet2000/nextjs-react-typescript-first-project/tree/main/components'>Lorem</Badge>
			<Rating rating={rating} isEditable={true} setRating={setRating} />
		</>
	);
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
	const firstCategory = 0;
	const { data: menu } = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
		firstCategory
	});
	return {
		props: {
			menu,
			firstCategory
		}
	};
};

interface HomeProps extends Record<string, unknown> {
	menu: MenuItem[],
	firstCategory: number;
}
