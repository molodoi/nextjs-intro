import React from 'react';
import styles from "../../styles/Home.module.css";
import {useRouter} from 'next/router';

export default function Liste(props) {

    const router = useRouter();

    console.log(props)
    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h1 className={styles.titre}>{router.query.liste.charAt(0).toUpperCase() + router.query.liste.slice(1)}</h1>
                    <div className="table-responsive">
                        <table className={styles.tableau}>
                            <tbody>
                                {props.listeEnCours.map(el => ( //en mettent des paranthèses à la place des {} on n'a pas besoin de mettre le return
                                <tr key={el.en + el.fr}>
                                    <td key={el.en}>{el.en}</td>
                                    <td key={el.fr}>{el.fr}</td>
                                </tr>
                                ))}  
                            </tbody>  
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
// permet d'obtenir des données pendant la construction
export async function getStaticProps(context){
    const slug = context.params.liste;
    const data = await import('/data/listes.json');

    const listeEnCours = data.englishList.find(list => list.name === slug)

    return {
        props: {
            listeEnCours: listeEnCours.data
        }
    }
}
// spécifie le routage dynamique basé sur les données
export async function getStaticPaths(){
    const data = await import('/data/listes.json')

    const paths = data.englishList.map(item => ({
        params: {liste: item.name}
    }))

    return {
        /* paths: [
            {params: {liste: "words"}}, //ici liste correspond au fichier [liste].js, ils doivent être identiques
        ], */
        paths,
        fallback: false
    }
}