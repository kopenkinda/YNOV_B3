<script>
export default {
  props: {
    question: {
      type: Object,
      required: true,
    },
    onremove: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    function addChoice() {
      const id = Date.now().toString() + Math.random().toString();
      props.question.choices.push({
        id,
        label: '',
      });
    }
    function selectChoice(id) {
      props.question.answer = id;
    }
    function removeChoice(id) {
      const idx = props.question.choices.findIndex((choice) => choice.id === id);
      if (props.question.answer === id) {
        props.question.answer = 'NONE';
      }
      props.question.choices.splice(idx, 1);
    }
    function removeQuestion() {
      props.onremove(props.question.id);
    }
    return {
      question: props.question,
      addChoice,
      selectChoice,
      removeChoice,
      removeQuestion,
    };
  },
};
</script>

<template>
  <div class="card mb-4">
    <div class="card-body">
      <div class="form-group mb-2">
        <label>Label</label>
        <div class="d-flex">
          <input type="text" class="form-control" v-model="question.label" placeholder="Enter question label" />
          <button class="btn btn-danger ms-2" @click="removeQuestion"><i class="far fa-trash-alt"></i></button>
        </div>
      </div>
      <div class="form-group mb-2">
        <label>Earnings</label>
        <input min="0" type="number" class="form-control" v-model="question.earnings" />
      </div>
      <div class="form-group">
        <label>Choices</label>
        <div class="d-flex flex-nowrap mb-2" v-for="choice in question.choices">
          <input
            type="text"
            class="form-control me-2"
            :class="question.answer == choice.id ? 'selected-choice' : ''"
            v-model="choice.label"
            placeholder="Enter choice label"
          />
          <button class="btn btn-info me-2" @click="selectChoice(choice.id)">
            <i class="far fa-check-square" v-if="choice.id === question.answer"></i>
            <i class="far fa-square" v-else></i>
          </button>
          <button class="btn btn-danger me" @click="removeChoice(choice.id)">
            <div class="far fa-trash-alt"></div>
          </button>
        </div>
        <button class="btn btn-secondary text-center w-100 mt-2" @click="addChoice">Add a choice</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.selected-choice {
  border: 1px solid #00a65a;
}
</style>
