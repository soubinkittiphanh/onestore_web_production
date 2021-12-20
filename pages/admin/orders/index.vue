<template>
  <div class="text-center">
    <v-dialog v-model="dialog" max-width="300px" persistent>
      <dialog-classic-message :message="message" @closedialog="message = null">
      </dialog-classic-message>
    </v-dialog>
   

    <v-dialog v-model="isloading" hide-overlay persistent width="300">
      <loading-indicator> </loading-indicator>
    </v-dialog>

    <v-card>
      <v-card-title>
        <v-row>
          <v-col cols="12" lg="5">
            <v-menu
              ref="menu1"
              v-model="menu1"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="dateFormatted"
                  label="Date"
                  hint="MM/DD/YYYY format"
                  persistent-hint
                  prepend-icon="mdi-calendar"
                  v-bind="attrs"
                  @blur="date = parseDate(dateFormatted)"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="date"
                no-title
                @input="menu1 = false"
              ></v-date-picker>
            </v-menu>
            <!--       
          </v-col>
          <v-col cols="12" lg="2"> -->
          </v-col>
          <v-col cols="12" lg="5">
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="ຊອກຫາ"
              single-line
              hide-detailsx
            />
          </v-col>
        </v-row>
      </v-card-title>

      <v-data-table
        v-if="loaddata"
        :headers="headers"
        :search="search"
        :items="loaddata"
      >

      </v-data-table>
    </v-card>
  </div>
</template>
<script>
export default {
  middleware: 'auths',
  data() {
    return {
      wallet: false,
      isedit: false,
      dialog: false,
      isloading: false,
      dialogForm: false,
      message: '',
      valid: true,
      name: '',
      search: '',

      loaddata: [],
      headers: [
        {
          text: 'ອໍເດີໄອດີ',
          align: 'center',
          value: 'order_id',
        },
        { text: 'ລະຫັດຜູ້ຊື້', align: 'center', value: 'user_id' },
        { text: 'ລະຫັດສິນຄ້າ', align: 'center', value: 'product_id' },
        { text: 'ຈຳນວນ', align: 'center', value: 'product_amount' },
        {
          text: 'ລາຄາ',
          align: 'end',
          value: 'product_price',
          sortable: true,
        },
        {
          text: 'ລວມ',
          align: 'end',
          value: 'order_price_total',
          sortable: false,
        },
        {
          text: 'ວັນທີ',
          align: 'center',
          value: 'txn_date',
          sortable: true,
        },
 
      ],

      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      dateFormatted: this.formatDate(
        new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
          .toISOString()
          .substr(0, 10)
      ),
      menu1: false,
      menu2: false,
    }
  },
  async created() {
    await this.fetchData()
  },
  watch: {
    message(val) {
      if (val != null) {
        this.dialog = true
        return
      }
      this.dialog = false
    },
    isedit(v) {
      if (!v) this.form_data.cus_id = '1XXX'
    },
    date(val) {
      this.dateFormatted = this.formatDate(this.date)
      this.fetchData()
    },
  },
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date)
    },
    totalSale() {
      let total=0;
      this.loaddata.forEach(el=>{
          total+=el.order_price_total
      })
        // return previousValue.order_price_total + currentValue.order_price_total
        return this.getFormatNum(total)
      }
    
  },
  methods: {
 

    getFormatNum(val){
        return new Intl.NumberFormat().format(val)
    },
    async fetchData() {
      this.isloading = true
      await this.$axios
        .get('order_date_f/?date=' + this.date)
        .then((res) => {
          this.loaddata = res.data.map((el) => {
            console.log(el.cus_id)
            return {
              order_id: el.order_id,
              user_id: el.user_id,
              product_id: el.product_id + ' - ' + el.pro_name,
              product_amount: el.product_amount,
              product_price: this.getFormatNum(el.product_price),
              order_price_total: this.getFormatNum(el.order_price_total),
              txn_date: el.txn_date.replaceAll("T"," "),
              function: el.order_id,
            }
          })
        })
        .catch((er) => {
          this.message = er
          console.log('Error: ' + er)
        })
      this.isloading = false
    },
    formatDate(date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${month}/${day}/${year}`
    },
    parseDate(date) {
      if (!date) return null

      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
  },
}
</script>

<style scoped>
.text-h5,
.grey {
  font-family: 'Noto Sans Lao';
}
</style>