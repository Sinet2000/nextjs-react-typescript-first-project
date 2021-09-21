import React from 'react';
import { Htag, Button, Ptag, Badge } from '../components';

export default function Home(): JSX.Element {
	return (
		<>
			<Htag tag='h1'>Text</Htag>
			<Button appearance='primary' arrow='right'>Appearance</Button>
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
		</>
	);
}
