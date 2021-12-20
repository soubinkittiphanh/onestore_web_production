<template>
  <div class="text-center">
    <h1>STOCK MANAGEMENT</h1>
    <v-dialog v-model="dialogMessage" max-width="300px">
      <dialog-classic-message :message="message" @closedialog="message = null">
      </dialog-classic-message>
    </v-dialog>
    <v-dialog v-model="isloading" hide-overlay persistent width="300">
      <loading-indicator> </loading-indicator>
    </v-dialog>
    <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="ຊອກຫາ"
          single-line
          hide-detailsx
        />
      </v-card-title>

      <v-data-table
        v-if="loaddata"
        :headers="headers"
        :search="search"
        :items="loaddata"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title
              >ສິນຄ້າທັງຫມົດ: {{ loaddata.length }}</v-toolbar-title
            >
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              dark
              class="mb-2"
              @click="
                dialogForm = true
                isedit = false
              "
            >
              ສ້າງໃຫມ່
            </v-btn>
          </v-toolbar>
        </template>
        <template v-slot:[`item.function`]="{ item }">
          <v-btn @click="delCard(item)">
            <i class="fas fa-trash"></i>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
export default {
  middleware: 'auths',
  validate(data) {
    // this.formData.pro_id = data.params.id
    console.log('MIXIN ID: ' + data.params.id)
    console.log('PRO DEFUALT ID: ' + this.pro_id)
    return /^\d+$/.test(data.params.id)
  },
  watch: {
    message(val) {
      if (val != null) {
        this.dialogMessage = true
        return
      }
      this.dialogMessage = false
    },
  },
  data() {
    return {
      showlist: false,
      isstock: false,
      isloading: false,
      dialogMessage: false,
      message: '',
      selectedStockProductId: '',
      loaddata: [],
      carddata: [],
      cardType: [],
      content: null,
      selectedCardType: '',
      search: '',
      headers: [
        { text: 'id', align: 'center', value: 'card_id' },
        { text: 'ລະຫັດສິນຄ້າ', align: 'center', value: 'pro_id' },
        { text: 'ເລກບັດ', align: 'center', value: 'card_number' },
        { text: 'ວັນທີ', align: 'center', value: 'input_date_time' },
        {
          text: 'ຟັງຊັ່ນ',
          align: 'end',
          value: 'function',
          sortable: false,
        },
      ],
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.isloading = true
      const prodId = this.$route.params.id
      console.log('product_id: ' + prodId)
      await this.$axios
        .get(`card_f/?pro_id=${prodId}`)
        .then((res) => {
          this.loaddata = res.data.map((el) => {
            console.log(el.id)
            return {
              card_id: el.id,
              pro_id: el.product_id,
              card_number: el.card_number,
              input_date_time: el.card_input_date,
              function: el.id,
            }
          })
        })
        .catch((er) => {
          this.message = er
          console.log('Error: ' + er)
        })
      this.isloading = false
    },
    async delCard(id) {
      this.isloading = true
      const prodId = this.$route.params.id
      const user=this.$store.getters.loggedInUser.id
      console.log('product_id: ' + prodId +user)
      await this.$axios
        .post('card_x', { card_id: id.card_id,user_id:user })
        .then((res) => {
          this.message = res.data
          console.log(this.message)
          this.fetchData();
        })
        .catch((er) => {
          this.message = er
          console.log('Error: ' + er)
        })
      this.isloading = false
    },
  },
}
</script>