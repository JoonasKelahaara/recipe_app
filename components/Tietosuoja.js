import { Text, View, ScrollView, TouchableOpacity} from 'react-native';
import {defaultStyle} from '../styles/styles.js'
import { AntDesign } from '@expo/vector-icons'
import React from "react"
import { useNavigation } from '@react-navigation/native';

export default function Tietosuoja({ name }) {

    const navigation = useNavigation()

    return(
    <ScrollView style={defaultStyle.navMargin}>
        <View style={defaultStyle.viewBorder}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={defaultStyle.infoLine} />
            <Text style={defaultStyle.infoHeader}>Tietosuoja</Text>
        <View style={defaultStyle.infoLine} />
        </View>
        <Text style={defaultStyle.infoText}>Rekisteri- ja tietosuojaseloste</Text>
        <Text style={defaultStyle.pageTitle}>Tämä on Puistokemistien EU:n yleisen tietosuoja-asetuksen (GDPR) mukainen rekisteri- ja tietosuojaseloste.
         Laadittu 06.12.2022. Viimeisin muutos 06.12.2022.</Text>

        <Text style={defaultStyle.infoText}>Rekisterinpitäjä</Text>
        <Text style={defaultStyle.pageTitle}>Puistokemistit, Yliopistokatu 9, 90570 Postitoimipaikka</Text>

        <Text style={defaultStyle.infoText}>Rekisteristä vastaava yhteyshenkilö</Text>
        <Text style={defaultStyle.pageTitle}>Matti Meikäläinen, matti@matinposti.com, 0401234567</Text>

        <Text style={defaultStyle.infoText}>Rekisterin nimi</Text>
        <Text style={defaultStyle.pageTitle}>Puistokemistien asiakasrekisteri, markkinointirekisteri, sidosryhmärekisteri,
         verkkopalvelun käyttäjärekisteri, jäsenrekisteri, työntekijärekisteri tms.</Text>

        <Text style={defaultStyle.infoText}>Oikeusperuste ja henkilötietojen käsittelyn tarkoitus</Text>
        <Text style={defaultStyle.pageTitle}>EU:n yleisen tietosuoja-asetuksen mukainen oikeusperuste henkilötietojen käsittelylle on{"\n"}{"\n"}
            - henkilön suostumus (dokumentoitu, vapaaehtoinen, yksilöity, tietoinen ja yksiselitteinen){"\n"}
            - sopimus, jossa rekisteröity on osapuolena{"\n"}
            - laki (mikä){"\n"}
            - julkisen tehtävän hoitaminen (mihin perustuu), tai{"\n"}
            - rekisterinpitäjän oikeutettu etu (esim. asiakassuhde ennen sopimusta, työsuhde, jäsenyys).{"\n"}{"\n"}
            Henkilötietojen käsittelyn tarkoitus on yhteydenpito asiakkaisiin, asiakassuhteen ylläpito, markkinointi tms.
            Tietoja ei käytetä automatisoituun päätöksentekoon tai profilointiin.</Text>

        <Text style={defaultStyle.infoText}>Rekisterin tietosisältö</Text>
        <Text style={defaultStyle.pageTitle}>Rekisteriin tallennettavia tietoja ovat: henkilön nimi, asema, yritys/organisaatio, yhteystiedot 
        (puhelinnumero, sähköpostiosoite, osoite), www-sivustojen osoitteet, verkkoyhteyden IP-osoite, tunnukset/profiilit sosiaalisen median
         palveluissa, tiedot tilatuista palveluista ja niiden muutoksista, laskutustiedot, muut asiakassuhteeseen ja tilattuihin palveluihin 
         liittyvät tiedot.{"\n"}{"\n"}

        Jos rekisteröityjen ryhmiä on useita (esim. asiakasrekisteri ja markkinointirekisteri),
         listaa ne sekä niiden tietosisältö pääpiirteissään.{"\n"}{"\n"}

        Tietoja säilytetään maailmanloppuun asti.{"\n"}{"\n"}

        Verkkosivuston vierailijoiden IP-osoitteita ja palvelun toiminnoille välttämättömiä evästeitä käsitellään oikeutetun
        edun perusteella mm. tietoturvasta huolehtimiseksi ja sivuston vierailijoiden tilastotietojen keruuta varten niissä tapauksissa,
        kun niiden voidaan katsoa olevan henkilötietoja. Kolmansien osapuolten evästeille pyydetään tarvittaessa suostumus erikseen.</Text>

        <Text style={defaultStyle.infoText}>Säännönmukaiset tietolähteet</Text>
        <Text style={defaultStyle.pageTitle}>Rekisteriin tallennettavat tiedot saadaan asiakkaalta mm. www-lomakkeilla
         lähetetyistä viesteistä, sähköpostitse, puhelimitse, sosiaalisen median palvelujen kautta, sopimuksista, asiakastapaamisista
          ja muista tilanteista, joissa asiakas luovuttaa tietojaan.{"\n"}{"\n"}

        Yritysten ja muiden organisaatioiden yhteyshenkilöiden tietoja voidaan kerätä myös julkisista lähteistä kuten verkkosivuilta,
        hakemistopalveluista ja muilta yrityksiltä.</Text>

        <Text style={defaultStyle.infoText}>Tietojen säännönmukaiset luovutukset ja tietojen siirto EU:n tai ETA:n ulkopuolelle</Text>
        <Text style={defaultStyle.pageTitle}>Tietoja ei luovuteta säännönmukaisesti muille tahoille. Tietoja voidaan julkaista siltä
         osin kuin niin on sovittu asiakkaan kanssa.{"\n"}{"\n"}

        Tietoja voidaan siirtää rekisterinpitäjän toimesta myös EU:n tai ETA:n ulkopuolelle.
        Tietoja ei siirretä Yhdysvaltoihin ilman rekisteröityjen nimenomaista suostumusta.</Text>

        <Text style={defaultStyle.infoText}>Rekisterin suojauksen periaatteet</Text>
        <Text style={defaultStyle.pageTitle}>Rekisterin käsittelyssä noudatetaan huolellisuutta ja tietojärjestelmien avulla käsiteltävät
         tiedot suojataan asianmukaisesti. Kun rekisteritietoja säilytetään Internet-palvelimilla, niiden laitteiston fyysisestä
          ja digitaalisesta tietoturvasta huolehditaan asiaankuuluvasti. Rekisterinpitäjä huolehtii siitä, 
          että tallennettuja tietoja sekä palvelimien käyttöoikeuksia ja muita henkilötietojen turvallisuuden kannalta 
          kriittisiä tietoja käsitellään luottamuksellisesti ja vain niiden työntekijöiden toimesta, joiden työnkuvaan se kuuluu.</Text>

        <Text style={defaultStyle.infoText}>Tarkastusoikeus ja oikeus vaatia tiedon korjaamista</Text>
        <Text style={defaultStyle.pageTitle}>Jokaisella rekisterissä olevalla henkilöllä on oikeus tarkistaa rekisteriin tallennetut tietonsa
        ja vaatia mahdollisen virheellisen tiedon korjaamista tai puutteellisen tiedon täydentämistä. Mikäli henkilö haluaa tarkistaa hänestä
        tallennetut tiedot tai vaatia niihin oikaisua, pyyntö tulee toimittaa rekisterinpitäjälle kasvotusten kahvikupposen kera. Rekisterinpitäjä voi pyytää
        tarvittaessa pyynnön esittäjää todistamaan henkilöllisyytensä. Rekisterinpitäjä vastaa asiakkaalle EU:n tietosuoja-asetuksessa säädetyssä
        ajassa (pääsääntöisesti kuukauden kuluessa).</Text>

        <Text style={defaultStyle.infoText}>Muut henkilötietojen käsittelyyn liittyvät oikeudet</Text>
        <Text style={defaultStyle.pageTitle}>Rekisterissä olevalla henkilöllä on oikeus pyytää häntä koskevien henkilötietojen poistamiseen rekisteristä
        ("oikeus tulla unohdetuksi"). Niin ikään rekisteröidyillä on muut EU:n yleisen tietosuoja-asetuksen mukaiset oikeudet kuten henkilötietojen
        käsittelyn rajoittaminen tietyissä tilanteissa. Pyynnöt tulee toimittaa rekisterinpitäjälle kasvotusten kahvikupposen kera. Rekisterinpitäjä voi pyytää
        tarvittaessa pyynnön esittäjää todistamaan henkilöllisyytensä. Rekisterinpitäjä vastaa asiakkaalle EU:n tietosuoja-asetuksessa säädetyssä
        ajassa (pääsääntöisesti kuukauden kuluessa).{"\n"}{"\n"}</Text>
        </View>
    </ScrollView>
    )
}