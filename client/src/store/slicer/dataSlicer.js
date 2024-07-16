import instance from "../../instance"
import { createSlice } from '@reduxjs/toolkit'
import axios from "axios"
export const dataSlicer = createSlice({
    name: "data_base",
    initialState: {
        user_build: [],
        monster_picture: [],
        all_armors: [],
        monster_by_id: {},
        monster_by_name: {},
        armor_head: [],
        armor_chest: [],
        armor_legs: [],
        armor_waist: [],
        armor_gloves: [],
        all_weapon: [],
        gpt_rating: '',
        monster_build: []
    },
    reducers: {
        user_build: (state, action) => {
            state.user_build = action.payload
        },
        monster_picture: (state, action) => {
            state.monster_picture = action.payload
        },
        all_armors: (state, action) => {
            state.all_armors = action.payload
        },
        monster_by_id: (state, action) => {
            state.monster_by_id = action.payload
        },
        monster_by_name: (state, action) => {
            state.monster_by_name = action.payload
        },
        armor_head: (state, action) => {
            state.armor_head = action.payload
        },
        armor_chest: (state, action) => {
            state.armor_chest = action.payload
        },
        armor_legs: (state, action) => {
            state.armor_legs = action.payload
        },
        armor_waist: (state, action) => {
            state.armor_waist = action.payload
        },
        armor_gloves: (state, action) => {
            state.armor_gloves = action.payload
        },
        all_weapon: (state, action) => {
            state.all_weapon = action.payload
        },
        set_gpt_rating: (state, action) => {
            state.gpt_rating = action.payload
        },
        monster_build: (state, action) => {
            state.monster_build = action.payload
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            serializableCheck: false,
        }
        )
    }
})
export const { armor_head, armor_chest, armor_legs, armor_waist, armor_gloves, all_weapon, user_build, monster_picture, all_armors, monster_by_id, monster_by_name, login_data, set_gpt_rating, monster_build } = dataSlicer.actions

export function get_user_build(MonsterName) {
    return async function (dispatch) {
        try {
            let { data } = await instance({
                url: "buildUser",
                method: "get",
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })
            if (MonsterName) {
                data = data.filter((el) => el.Monster.name === MonsterName)
            }
            dispatch(user_build(data))
        } catch (error) {
            console.log(error);
        }
    }
}

export function get_monster_picture() {

    return async function (dispatch) {
        try {
            const { data } = await instance({
                url: "monster",
                method: "get"
            })
            dispatch(monster_picture(data))
        } catch (error) {
            console.log(error);
        }
    }
}

export function get_all_armors(namaDicari) {
    return async function (dispatch, getState) {
        try {
            const { data } = await axios({
                url: "https://mhw-db.com/armor",
                method: "get"
            })
            dispatch(all_armors(data))
        } catch (error) {
            console.log(error);
        }
    }
}

export function get_armors_head(allArmors) {
    return async function (dispatch) {
        try {
            const head = allArmors.filter(el => el.type === "head")
            dispatch(armor_head(head))
        } catch (error) {
            console.log(error);
        }
    }
}

export function get_armors_chest(allArmors) {
    return async function (dispatch) {
        try {
            const chest = allArmors.filter(el => el.type === "chest")
            dispatch(armor_chest(chest))
        } catch (error) {
            console.log(error);
        }
    }
}

export function get_armors_legs(allArmors) {
    return async function (dispatch) {
        try {
            const legs = allArmors.filter(el => el.type === "legs")
            dispatch(armor_legs(legs))
        } catch (error) {
            console.log(error);
        }
    }
}

export function get_armors_waist(allArmors) {
    return async function (dispatch) {
        try {
            const waist = allArmors.filter(el => el.type === "waist")
            dispatch(armor_waist(waist))
        } catch (error) {
            console.log(error);
        }
    }
}

export function get_armors_gloves(allArmors) {
    return async function (dispatch) {
        try {
            const gloves = allArmors.filter(el => el.type === "gloves")
            dispatch(armor_gloves(gloves))
        } catch (error) {
            console.log(error);
        }
    }
}

export function get_all_weapons() {
    return async function (dispatch) {
        try {
            const { data } = await axios({
                url: "https://mhw-db.com/weapons",
                method: "get"
            })
            dispatch(all_weapon(data))
        } catch (error) {
            console.log(error);
        }
    }
}



export function get_monster_by_id(id) {
    return async function (dispatch) {
        try {
            const { data } = await axios({
                url: `https://mhw-db.com/monsters/${id}`,
                method: "get"
            })
            dispatch(monster_by_id(data))
        } catch (error) {
            console.log(error);
        }
    }
}

export function get_monster_by_name(name) {
    return async function (dispatch) {
        try {
            const { data } = await instance({
                url: `monster/${name}`,
                method: "get"
            })
            dispatch(monster_by_name(data))
        } catch (error) {
            console.log(error);
        }
    }
}

export function post_register(register_data) {
    return async function (dispatch) {
        try {
            await instance({
                url: `register`,
                method: "post",
                data: {
                    username: register_data.username,
                    email: register_data.email,
                    password: register_data.password,
                }
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export function post_login(login_form) {
    return async function (dispatch) {
        try {
            const { data } = await instance({
                url: `login`,
                method: "post",
                data: {
                    email: login_form.email,
                    password: login_form.password
                }
            })
            localStorage.access_token = data.access_token
        } catch (error) {
            console.log(error);
        }
    }
}

export function post_login_google(token) {
    return async function () {
        try {
            const { data } = await instance({
                url: `login-google`,
                method: "post",
                headers: {
                    google_token: token
                }
            })
            localStorage.access_token = data.access_token
        } catch (error) {
            console.log(error);
        }
    }
}

export function post_add_build(form) {
    return async function (dispatch) {
        try {
            const head = await axios({
                url: `https://mhw-db.com/armor/${form.head}`,
                method: "get"
            })
            const chest = await axios({
                url: `https://mhw-db.com/armor/${form.chest}`,
                method: "get"
            })

            const legs = await axios({
                url: `https://mhw-db.com/armor/${form.legs}`,
                method: "get"
            })

            const waist = await axios({
                url: `https://mhw-db.com/armor/${form.waist}`,
                method: "get"
            })

            const gloves = await axios({
                url: `https://mhw-db.com/armor/${form.gloves}`,
                method: "get"
            })

            const weapon = await axios({
                url: `https://mhw-db.com/weapons/${form.weapon}`,
                method: "get"
            })

            const { data } = await instance({
                url: `/build/${form.MonsterName}`,
                method: "post",
                data: {
                    head, chest, legs, waist, gloves, weapon
                },
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })
            dispatch(set_gpt_rating(data))
        } catch (error) {
            console.log(error);
        }
    }
}

export function delete_build(id) {
    return async function (dispatch) {
        try {
            await instance({
                url: `delete/${id}`,
                method: "delete",
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export function get_monster_build(MonsterName) {
    return async function (dispatch) {
        try {
            const { data } = await instance({
                url: `/build/${MonsterName}`,
                method: "get"
            })
            dispatch(monster_build(data))
        } catch (error) {
            console.log(error);
        }
    }
}

export default dataSlicer.reducer