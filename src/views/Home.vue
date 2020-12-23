<template>
  <section>
    <h1>Calculator</h1>
      <b-container>
        <b-row>
         <b-col cols="6">
          <label for="auction">Выберите аукцион</label>
          <b-form-select @input="setAuction" v-model="auction" id="auction" class="mb-2">
            <b-select-option value="0">Выберите аукцион</b-select-option>
            <b-select-option value="1">Copart</b-select-option>
            <b-select-option value="2">iaai</b-select-option>
          </b-form-select>
					<b-col>
          <label for="placement">Где находится лот?</label>
          <b-form-input @input="showPlacemant" v-model="lotPlacement" id="placement" class="mb-2">
          </b-form-input>
          <ul class="placement-list" v-if="isListActive">
            <li :key="index" @click="setPlacement(item.name)" class="placement-item"
              v-for="(item,index) in filtered">
              {{item.name}}
            </li>
          </ul>
					</b-col>
					<label for="port">Выберите порт отгрызки в США</label>
          <b-form-select v-model="port" id="port" class="mb-2">
            <b-select-option :key="index" :value="port.price" v-for="(port,index) in computedPorts">
              {{ port.name }} {{ port.price }} $
            </b-select-option>
          </b-form-select>
					<label for="mark">Введите марку и название автомобиля</label>
          <b-form-input  id="mark" placeholder="Start typing for search..." class="mb-2" />
					<label for="link">Введите ссылку на авто (опция)</label>
          <b-form-input id="link" placeholder="car.link.com" class="mb-2" />
					<label for="price">Введите цену покупки авто</label>
          <b-form-input id="price" placeholder="5000$" v-model="autoPrice" class="mb-2" />
					<label for="year">Год производства</label>
          <b-form-input id="year" placeholder="2006" v-model="yearsOfAuto" class="mb-2" />
					<label for="fuel">Выберите тип топлива</label>
          <b-form-select id="fuel" v-model="typeOfFuel" class="mb-2">
            <b-select-option value="B">Бензин</b-select-option>
            <b-select-option value="D">Дизель</b-select-option>
          </b-form-select>
					<label for="V">Обьем двигателя в литрах (2.2)</label>
          <b-form-input id="V" placeholder="2.5" v-model="V_engine" class="mb-2" />
					<label for="broker">Услуги Брокер и экспедитор</label>
          <b-form-input id="broker" v-model="brekerService" class="mb-2" />
					<label for="services">Услуги</label>
          <b-form-input id="services" v-model="services" class="mb-2" />
					<label for="sertificat">Сертификация</label>
          <b-form-input id="sertificat" v-model="sertification" class="mb-2" />
					<label for="uaction">Сбор аукциона</label>
          <b-form-input id="uaction" v-model="auctionProcent" class="mb-2" />
					<label for="dostavka">Доставка до Одессы (суша +море)</label>
          <b-form-input id="dostavka" v-model="SummOfSeaAndEarth" class="mb-2" />
					<label for="rastamojka">Растаможка</label>
          <b-form-input id="rastamojka" v-model="rastamojka" class="mb-2" />
					<label for="fond">Постановка на Учет (пенсионный фонд)</label>
          <b-form-input id="fond" v-model="pensiynii_fond" class="mb-2" />
          <div>
            <strong>Total:{{ GetTotalSumm }}</strong>
          </div>
        </b-col>
    </b-row>
		</b-container>
  </section>
</template>
<script>
	// @ is an alias to /src

	export default {
		name: 'Home',
		components: {},
		methods: {
			showPlacemant() {
				this.filtered = this.auctionList.filter(x => x.name.toLowerCase().indexOf(this.lotPlacement) >
					-1)
				this.isListActive = true;
			},
			setAuction() {
				this.auction === '1' ? this.auctionList = this.copartList : this.auctionList = this.aiiaList;
			},
			setPlacement(item) {
				this.lotPlacement = item;
				this.isListActive = false;
				this.computedPorts = [];
				this.GetPortList();
			},
			GetPortList() {
				const list = this.auctionList.filter(x => x.name === this.lotPlacement);
				return this.computedPorts = list[0].ports;
			},
		},
    computed:{
    GetTotalSumm() {
      return Number(this.port) + Number(this.GetAkciz);
      },
    GetYearsOfCar() {
       const currentYear = new Date().getFullYear();
       return currentYear - this.yearsOfAuto;
    },
    GetAkcizWithFuelTypeAndV_engine() {
       let value = 0;
       if (this.typeOfFuel === 'B') {
         return this.V_engine <= 3 ? value = 50 : value = 100; //цена в евро
       }
       if (this.typeOfFuel === 'D') {
         return this.V_engine <= 3.5 ? value = 75 : value = 150; //цена в евро
       }
       return value;
    },
    GetAkciz(){
       return this.GetAkcizWithFuelTypeAndV_engine * this.V_engine * this.GetYearsOfCar;
    }
    },
		data: () => ({
			isListActive: false,
			lotPlacement: '',
			auction: '0',
			auctionList: [],
			filtered: [],
			port: '',
			computedPorts: [],
			autoPrice: '',
      yearsOfAuto: '',
      V_engine: '',
      typeOfFuel: 'B',
			brekerService: '',
			services: '',
			sertification: '',
			auctionProcent: '',
			SummOfSeaAndEarth: '',
			rastamojka: '',
			pensiynii_fond: '',
			copartList: [
				{
					name: "INDIANAPOLIS - IN", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '475', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '475', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "OCALA - FL", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '250', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "HONOLULU - HI", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '1600', value: ''},
					]
				},
				{
					name: "GLASSBORO EAST - NJ", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '200', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "SUN VALLEY - CA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '160', value: ''},
					]
				},
				{
					name: "JACKSONVILLE EAST - FL", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '175', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "DES MOINES - IA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '550', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "TRENTON - NJ", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '150', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "CANDIA - NH", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '375', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "TALLAHASSEE - FL", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '275', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "FLINT - MI", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '475', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "ROCHESTER - NY", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '350', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "FORT WAYNE - IN", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '500', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "BIRMINGHAM - AL", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '300', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "DAVENPORT - IA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '500', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "MADISON - WI", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '575', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "NORTH CHARLESTON", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '200', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "LUMBERTON -NC", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '250', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "PHOENIX - AZ", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '275', value: ''},
					]
				},
				{
					name: "KANSAS CITY - KS", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '475', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "ATLANTA SOUTH - GA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '225', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "ORLANDO - FL", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '250', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					// TODO: тут немаэ ніякого прайса
					name: "WEBSTER - NH", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "FT.PIERCE - FL", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '350', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "CLEVELAND WEST - OH", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '400', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "ATLANTA EAST - GA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '225', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "MINNEAPOLIS - MN", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '500', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "AMARILLO - TX", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '400', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "BAKERSFIELD - CA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '225', value: ''},
					]
				},
				{
					name: "JACKSONVILLE NORTH -FL", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '175', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "SAVANNAH - GA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '125', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "KNOXVILLE - TN", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '325', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "DANVILLE - VA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '375', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "SPOKANE - WA", value: null, ports: [
						{name: 'WA', price: '325', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '700', value: ''},
					]
				},
				{
					name: "LEXINGTON WEST - KY", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '425', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "MACON - GA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '200', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "PORTLAND SOUTH - OR", value: null, ports: [
						{name: 'WA', price: '250', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '475', value: ''},
					]
				},
				{
					name: "EUGENE - OR", value: null, ports: [
						{name: 'WA', price: '280', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '475', value: ''},
					]
				},
				{
					name: "MINNEAPOLIS NORTH - MN", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '500', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "CARTERSVILLE - GA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '250', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "NEWBURGH - NY", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '225', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "ANCHORAGE - AK", value: null, ports: [
						{name: 'WA', price: '1850', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '2100', value: ''},
					]
				},
				{
					name: "RENO - NV", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '375', value: ''},
					]
				},
				{
					name: "CHARLESTON - SC", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '200', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "DENVER CENTRAL - CO", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '500', value: ''},
					]
				},
				{
					name: "DENVER - CO", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '500', value: ''},
					]
				},
				{
					name: "ST. LOUIS - MO", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '275', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "NASHVILLE - TN", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '475', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "OKLAHOMA CITY - OK", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '350', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "COLUMBIA - MO", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '500', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "LITTLE ROCK - AR", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '425', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "SYRACUSE - NY", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '300', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '275', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "BATON ROUGE - LA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '375', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "HARRISBURG - PA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '275', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "PEORIA - IL", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '475', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "SOUTH BOSTON - MA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '275', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "CULPEPER - VA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '350', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "ANDREWS-TX", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '425', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "MARTINEZ - CA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '325', value: ''},
					]
				},
				{
					name: "FREMONT - CA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "COLUMBUS - OH", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '400', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "PITTSBURGH EAST - PA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '375', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "SALT LAKE CITY - UT", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '425', value: ''},
					]
				},
				{
					name: "IONIA - MI", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '500', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "BOISE - ID", value: null, ports: [
						{name: 'WA', price: '450', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '550', value: ''},
					]
				},
				{
					name: "HARTFORD SPRINGFIELD-CT", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '225', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "EXETER - RI", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '300', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "PITTSBURGH WEST - PA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '375', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "MONTGOMERY - AL", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '300', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "BUFFALO - NY", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '425', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "SHREVEPORT - LA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '225', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "ALBUQUERQUE - NM", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '475', value: ''},
					]
				},
				{
					name: "PUNTA GORDA - FL", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '300', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "ORLANDO SOUTH - FL", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '250', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "MIAMI CENTRAL - FL", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '350', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "CONCORD - NC", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '250', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "BILLINGS - MT", value: null, ports: [
						{name: 'WA', price: '700', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '750', value: ''},
					]
				},
				{
					name: "WACO - TX", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '250', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "SCRANTON - PA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '225', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "BALTIMORE - MD", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '250', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "TAMPA SOUTH - FL", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '275', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "CRASHEDTOYS EAST BETHEL - MN", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '600', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "SACRAMENTO - CA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '325', value: ''},
					]
				},
				{
					name: "PHILADELPHIA EAST - SUBLOT - PA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '190', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "VAN NUYS - CA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '140', value: ''},
					]
				},
				{
					name: "CHAMBERSBURG - PA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '350', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "NORTH SEATTLE - WA", value: null, ports: [
						{name: 'WA', price: '175', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '500', value: ''},
					]
				},
				{
					name: "WEST WARREN - MA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '275', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "MCALLEN - TX", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '225', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "ABILENE - TX", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '350', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "DETROIT - MI", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '375', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "SOMERVILLE - NJ", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '150', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "CRASHEDTOYS SACRAMENTO - CA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '350', value: ''},
					]
				},
				{
					name: "SOUTHERN ILLINOIS - IL", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '475', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "SAN JOSE - CA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '350', value: ''},
					]
				},
				{
					name: "CHICAGO NORTH - IL", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '475', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "WEST PALM BEACH - FL", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '350', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "SAN ANTONIO - TX", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '250', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "CLEVELAND EAST - OH", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '400', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "ATLANTA NORTH - GA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '250', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "LOS ANGELES - CA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '130', value: ''},
					]
				},
				{
					name: "RALEIGH - NC", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '250', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "SO SACRAMENTO - CA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '325', value: ''},
					]
				},
				{
					name: "AUSTIN - TX", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '225', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "GRAHAM - WA", value: null, ports: [
						{name: 'WA', price: '125', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '475', value: ''},
					]
				},
				{
					name: "LUFKIN - TX", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '200', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "LINCOLN - NE", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '575', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "DENVER SOUTH - CO", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '500', value: ''},
					]
				},
				{
					name: "PASCO - WA", value: null, ports: [
						{name: 'WA', price: '325', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '725', value: ''},
					]
				},
				{
					name: "LEXINGTON EAST - KY", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '425', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "SAN BERNARDINO- CA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '160', value: ''},
					]
				},
				{
					name: "FRESNO - CA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '250', value: ''},
					]
				},
				{
					name: "CRASHEDTOYS MINNEAPOLIS-MN", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '800', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "PITTSBURG SOUTH - PA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '375', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "CRASHEDTOYS DALLAS- TX", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '225', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "WALTON - KY", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '225', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "FT.WORTH - TX", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '225', value: ''},
						{name: 'Savannah', price: '275', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "PHILADELPHIA - PA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '190', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "HAYWARD - CA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '325', value: ''},
					]
				},
				{
					name: "PORTLAND NORTH - OR", value: null, ports: [
						{name: 'WA', price: '250', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '475', value: ''},
					]
				},
				{
					name: "CASPER - WY", value: null, ports: [
						{name: 'WA', price: '950', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '1000', value: ''},
					]
				},
				{
					name: "YORK HAVEN - PA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '250', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "REDDING - CA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '425', value: ''},
					]
				},
				{
					name: "ALTOONA - PA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '375', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "WHEELING - IL", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '400', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "DALLAS - TX", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '200', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "RICHMOND - VA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '350', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "ATLANTA WEST - GA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '225', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "SPARTANBURG - SC", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '250', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "FAYETTEVILLE - AR", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '400', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "ALBANY - NY", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '250', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "FREDERICKSBURG - VA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '275', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "SIKESTON - MO", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '475', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "ANTELOPE - CA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "DOTHAN - AL", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '300', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "ST. CLOUD - MN", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '550', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "VALLEJO - CA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '325', value: ''},
					]
				},
				{
					name: "MIAMI SOUTH - FL", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '350', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "DALLAS SOUTH - TX", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '200', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "SAN DIEGO - CA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '175', value: ''},
					]
				},
				{
					name: "GREER - SC", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '225', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "MEMPHIS - TN", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '400', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "JACKSONVILLE WEST - FL", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '175', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "HAMMOND - IN", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '450', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "TIFTON - GA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '225', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "MOBILE - AL", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '325', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "TUCSON - AZ", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '325', value: ''},
					]
				},
				{
					name: "CRASHEDTOYS ELDRIDGE - IA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '750', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "LONG ISLAND - NY", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '230', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "NORTH BOSTON - MA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '275', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "MILWAUKEE - WI", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '450', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '575', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "LOUISVILLE - KY", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '425', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "RICHMOND EAST-VA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '350', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "MOCKSVILLE - NC", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '275', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "KINCHELOE - MI", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '850', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "EL PASO - TX", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '375', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "SPRINGFIELD - MO", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '475', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "PHILADELPHIA EAST", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '190', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "LONGVIEW - TX", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '225', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "LYMAN - ME", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '400', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				// TODO: нет прайса
				{
					name: "TORONTO CANADA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "ORLANDO NORTH - FL", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '250', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "CORPUS CHRISTI - TX", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '250', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "CRASHEDTOYS ATLANTA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '225', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "MEBANE - NC", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '275', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "COLORADO SPRINGS - CO", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '500', value: ''},
					]
				},
				{
					name: "MIAMI NORTH - FL", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '350', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "LANSING - MI", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '500', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "RANCHO CUCAMONGA - CA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '170', value: ''},
					]
				},
				{
					name: "HAMPTON - VA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '350', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "APPLETON - WI", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '575', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "HARTFORD - CT", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '225', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "LONG BEACH - CA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '130', value: ''},
					]
				},
				{
					name: "DETROIT MI", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '475', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "WICHITA - KS", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '425', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "COLUMBIA - SC", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '190', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "OGDEN- UT", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '375', value: ''},
					]
				},
				{
					name: "CHARLESTON - WV", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '475', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "HELENA - MT", value: null, ports: [
						{name: 'WA', price: '575', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '750', value: ''},
					]
				},
				{
					name: "CHICAGO SOUTH - IL", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '475', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "TULSA - OK", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '375', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "DAYTON - OH", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '400', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "NEW ORLEANS - LA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '375', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "CHINA GROVE - NC", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '225', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "HOUSTON - TX", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '200', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "JACKSON - MS", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '350', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "PITTSBURGH NORTH - PA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '375', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "WASHINGTON DC - MD", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '250', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "SEAFORD - DE", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '250', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "TANNER - AL", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '325', value: ''},
						{name: 'CA', price: '--', value: ''},
					]
				},
				{
					name: "LAS VEGAS - NV", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
			],
			aiiaList: [
				{
					name: "LAFAYETTE - LA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "INDIANAPOLIS - IN", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "TAMPA - FL", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "DALLAS / FT. WORTH - TX", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "SIOUX FALLS - SD", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "HONOLULU - HI", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "SUFFOLK - VA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "CHICAGO NORTH - IL", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "DES MOINES - IA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "SAN ANTONIO - TX", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "FLINT - MI", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "ROCHESTER - NY", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "DUNDALK - MD", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "ATLANTA NORTH - GA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "LOUISVILLE NORTH - KY", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "LOS ANGELES - CA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "NOTHERN NEW JERSEY - NJ", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "RALEIGH - NC", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "SEATLE - WA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "ROSEDALE - MD", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "Fredericksburg-South - VA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "OMAHA - NE", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "AUSTIN - TX", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "ADESA BIRMINGHAM - AL", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "PERMIAN BASIN - TX", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "ACE CARSON - CA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "DAVENPORT - IA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "BIRMINGHAM - AL", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "ENGLISHTOWN - NJ", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "MISSOULA - MT", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "BUCKHANNON - WV", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "EAST BAY - CA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "SAN ANTONIO SOUTH - TX", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "PHOENIX - AZ", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "KANSAS CITY - KS", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "CENTRAL NEW JERSEY - NJ", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "PROVIDENCE - RI", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "ATLANTA SOUTH - GA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "FT.PIERCE - FL", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "ORLANDO - FL", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "HOUSTON NORTH - TX", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "ERIE - PA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "SPECIALTY DIVISION - IL", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "FRESNO - CA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "ATLANTA EAST - GA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "AMARILLO - TX", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "NEW CASTLE - DE", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "TIDEWATER - VA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "FORT MYERS - FL", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "SAVANNAH - GA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "PHILADELPHIA - PA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "JACKSONVILLE - FL", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "KNOXVILLE - TN", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "PORTLAND NORTH - OR", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "CASPER - WY", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "Lexington - SC", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "SPOKANE - WA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "ALTOONA - PA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "BIRMINGHAM - BLENDED SALES - AL", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "RICHMOND - VA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "DALLAS - TX", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "NORTH HOLLYWOOD - CA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "CHICAGO WEST - IL", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "MACON - GA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "BOSTON-SHIRLEY - MA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "HIGH DESERT - CA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "HARTFORD SOUTH - CT", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "PENSACOLA - FL", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "EUGENE - OR", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "FAYETTEVILLE - AR", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "BOWLING GREEN - KY", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "NEWBURGH - NY", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "ALBANY - NY", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "DENVER EAST - CO", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "ATLANTA - GA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "PORTAGE - WI", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "DOTHAN - AL", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "AVENEL - NJ", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "ANCHORAGE - AK", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "NEW ORLEANS EAST - LA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "RENO - NV", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "CHARLOTTE - NC", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "BURLINGTON - VT", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "CHARLESTON - SC", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "SAN DIEGO - CA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "DENVER - CO", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "MEMPHIS - TN", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "WESTERN COLORADO - CO", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "SOUTHERN NEW JERSEY - NJ", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "CINCINNATI SOUTH - OH", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "FORT WORTH NORTH - TX", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "NASHVILLE - TN", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "TIFTON - GA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "FONTANA - CA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "OKLAHOMA CITY - OK", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "SEATLE SOUTH - WA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "CLEVELAND - OH", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "TAUNTON - MA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "LITTLE ROCK - AR", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "GRAND RAPIDS - MI", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "BATON ROUGE - LA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "SYRACUSE - NY", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "TUCSON - AZ", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "PITTSBURGH - PA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "LONG ISLAND - NY", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "PORTLAND GORHAM - ME", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "CULPEPER - VA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "LINCOLN - IL", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "MILWAUKEE - WI", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "FREMONT - CA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "COLUMBUS - OH", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "LOUISVILLE - KY", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "SALT LAKE CITY - UT", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "NEW ORLEANS AND LOUISIANA FLOOD", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "EL PASO - TX", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "BOISE - ID", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "SPRINGFIELD - MO", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "ANAHEIM - CA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "LONGVIEW - TX", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "ACE-PERRIS", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "MIAMI - FL", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "GREAT LAKES - MI", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "ORLANDO NORTH - FL", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "City", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "CORPUS CHRISTI - TX", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "ASHLAND - KY", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "BRIDGEPORT - PA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "ROCHESTER WEST - NY", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "LUBBOCK - TX", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "BUFFALO - NY", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "SHREVEPORT - LA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "ACRON CANTON - OH", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "MIAMI NORTH - FL", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "SHADY SPRING - WV", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "ALBUQUERQUE - NM", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "NOTHERN VIRGINIA - VA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "NASHVILLE - BLENDED SALES - TN", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "TAMPA NORTH - FL", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "METRO - DC", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "PORTLAND - OR", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "GREENVILLE - SC", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "LAUREL - MD", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "CINCINNATI - OH", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "APPLETON - WI", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "HARTFORD - CT", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "WICHITA - KS", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "CHATTANOOGA - TN", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "COLUMBIA - SC", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "CONCORD - NC", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "YORK SPRINGS - PA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "PADUCAH - KY", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "GREENSBORO - NC", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "BILLINGS - MT", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "TEMPLETON-MA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "IAA CAT Houston - TX", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "SCRANTON - PA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "BALTIMORE - MD", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "MINNEAPOLIS/ST.PAUL - MN", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "HUNTSVILLE - AL", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "CHICAGO SOUTH - IL", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "MANCHESTER - NH", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "TULSA - OK", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "DAYTON - OH", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "COLTON - CA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "SACRAMENTO - CA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "NEW ORLEANS - LA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "GRENADA - MS", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "SOUTH BEND - IN", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "CLEARWATER - FL", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "WILMINGTON - NC", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "ST. LOUIS - IL", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "HOUSTON - TX", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "JACKSON - MS", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "PITTSBURGH NORTH - PA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "PULASKI - VA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "PORTLAND WEST - OR", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "MCALLEN - TX", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "ASHEVILLE - NC", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "FARGO - ND", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "GULF COAST - MS", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "HOUSTON SOUTH - TX", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "ABILENE - TX", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "LAS VEGAS - NV", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "DETROIT - MI", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
				{
					name: "ROANOKE - VA", value: null, ports: [
						{name: 'WA', price: '--', value: ''},
						{name: 'NY', price: '--', value: ''},
						{name: 'TX', price: '--', value: ''},
						{name: 'Savannah', price: '--', value: ''},
						{name: 'CA', price: '300', value: ''},
					]
				},
			]
		})
	}
</script>
<style lang="scss">
  .placement-list {
    list-style: none;
    padding: 0;
    border: 1px solid;
    position: absolute;
    top: 100%;
    width: 90%;
    z-index: 2;
    background: #efefef;
    border-radius: .3px;
    border-color: #ced4da;
  }
  
  .placement-item {
    padding: 10px;
    font-weight: 600;
    color: #26a69a;
    font-size: 16px;
    line-height: 22px;
    
    &:hover {
      background: rgba(0,0,0,0.08);
      cursor: pointer;
    }
  }
</style>
